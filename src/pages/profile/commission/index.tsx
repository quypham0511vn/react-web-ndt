import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { arrKeyCommission, arrKeyCommissionMobile, columnNameCommission, labelArrCommission } from 'assets/static-data/invest';
import { vi_locale } from 'assets/static-data/locale-date';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import PeriodInvestMobile from 'components/period-invest-mobile';
import TableInvest from 'components/table-invest';
import dayjs from 'dayjs';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { observer } from 'mobx-react';
import { CommissionModel, Detail, Total } from 'models/commission';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './commission.module.scss';

const cx = classNames.bind(styles);

const Commission = observer(() => {

    const { apiServices, common } = useAppStore();
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0].slice(0, 7));
    const [commission, setCommission] = useState<CommissionModel>();

    useEffect(() => {
        fetchCommissionData();
    }, [filterDate]);

    const fetchCommissionData = useCallback(async () => {
        const my = filterDate?.split('-');
        if (my?.length === 2) {
            setIsLoading(true);
            const res = await apiServices.auth.getCommissionInfo(
                my?.[1] || '', my?.[0] || ''
            ) as any;
            setIsLoading(false);
            if (res.success && res.data) {
                setCommission(res.data as CommissionModel);
            }
        }
    }, [apiServices.auth, filterDate]);

    const renderTable = useMemo(() => {
        return (
            <>
                {isMobile
                    ? <PeriodInvestMobile
                        dataTableInvest={commission?.detail as Detail[]}
                        labelArr={labelArrCommission}
                        arrKey={arrKeyCommissionMobile}
                        total={commission?.total as Total}
                        description={Languages.commission.describeNoData}
                    />
                    : <TableInvest
                        dataTableInvest={commission?.detail as Detail[]}
                        arrKey={arrKeyCommission}
                        columnName={columnNameCommission}
                        isLoading={isLoading}
                        description={Languages.commission.describeNoData}
                        dataFooter={commission?.total as Total}
                    />
                }
            </>
        );
    }, [commission?.detail, commission?.total, isLoading, isMobile]);

    const renderDate = useCallback((_placeHolder: string, _value: string) => {
        const onChange: DatePickerProps['onChange'] = (date, dateString) => {
            setFilterDate(dateString);
        };
        return (
            <Space direction="vertical">
                <DatePicker
                    locale={vi_locale}
                    onChange={onChange}
                    picker="month"
                    className={cx('input-container')}
                    placeholder={_placeHolder}
                    defaultValue={dayjs(_value || new Date().toISOString().split('T')[0].slice(0, 7))}
                    disabledDate={d => !d || d.isAfter(new Date().toISOString().split('T')[0].slice(0, 7))}
                />
            </Space>
        );
    }, []);

    const renderItemDescribe = useCallback((_describe: string) => {
        return (
            <div className={cx('row g-4')}>
                <span className={cx('star')}>{Languages.commission.star}</span>
                <span className={cx('h6 text-black')}>{_describe}</span>
            </div>
        );
    }, []);

    return (
        <div className={cx('content')}>
            <div className={cx('container-edit column g-4', 'shadow')}>
                <div className={cx('column g-20', isMobile ? '' : 'pt-16 pl-16 pr-16')}>
                    <div className={cx('date-container')}>
                        <span className={cx('h5 text-black medium')}>{Languages.commission.investmentCommission}</span>
                        {renderDate(Languages.commission.chooseDate, filterDate || '')}
                    </div>

                    <div className={cx(isMobile ? 'describe-container-mobile' : 'describe-container')}>
                        {renderItemDescribe(Languages.commission.describe[0])}
                        {renderItemDescribe(Languages.commission.describe[1].replace('%str', `${common.appConfig?.date_commission}`))}
                    </div>
                </div>
                {renderTable}
            </div>
        </div>
    );
});

export default Commission;
