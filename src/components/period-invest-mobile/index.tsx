import classNames from 'classnames/bind';
import { COLOR_TRANSACTION } from 'commons/constants';
import Languages from 'commons/languages';
import NoData from 'components/no-data';
import Spinner from 'components/spinner';
import { Total } from 'models/commission';
import React, { useCallback, useMemo } from 'react';
import { COLORS } from 'theme/colors';
import utils from 'utils/utils';
import style from './period-invest-mobile.module.scss';
const cx = classNames.bind(style);

const PeriodInvestMobile = ({
    dataTableInvest,
    labelArr,
    arrKey,
    total,
    isLoading,
    description
}: {
    dataTableInvest: any,
    labelArr: Object,
    arrKey: Array<string>,
    total?: Total,
    isLoading?: boolean,
    description?: string
}) => {

    const renderLabel = useCallback((item?: Object) => {
        for (const key in item) {
            if (key === 'ky_tra') {
                return <span className={cx('text-gray h7 text-center')}>{item['ky_tra']}</span>;
            }
            if (key === 'trang_thai') {
                return <span
                    className={cx('h7 text-gray text-center')}
                    style={{ color: item['color'] === COLOR_TRANSACTION.GREEN ? COLORS.GREEN_2 : item['color'] }}
                >
                    {item['trang_thai']}</span>;
            }
            if (key === 'ma_hop_dong') {
                return <span className={cx('h7 text-center text-blue')}>{item['ma_hop_dong']}</span>;
            }
            if (key === 'name') {
                return <span className={cx('h7 text-center text-gray')}>{item['name']}</span>;
            }
        }
    }, []);

    const renderPeriodInvest = useMemo(() => {
        return (
            <>
                {dataTableInvest && dataTableInvest?.map?.((item: any, index: number) => {

                    return (
                        <div key={index} className={cx('period-container', 'column')}>
                            {renderLabel(item)}
                            <div key={index} className={cx((index + 1) % 2 === 0 ? 'row-even' : 'row-odd')}>
                                {arrKey?.map((keyItem: string, indexKey: number) => {
                                    if (Object.keys(item).some((key => key === keyItem && key !== 'color'))) {
                                        return (
                                            <div className={cx('row y20 space-between')} key={indexKey}>
                                                <span className={cx('text-gray h7 text-end')}>{labelArr[keyItem]}</span>
                                                {keyItem === 'hinh_thuc'
                                                    ? <span
                                                        className={cx('text-green h7 text-end')}
                                                        style={{ color: item['color'] === COLOR_TRANSACTION.GREEN ? COLORS.GREEN_2 : item['color'] }}
                                                    >
                                                        {item[keyItem]}
                                                    </span>
                                                    : <span className={cx('text-gray h7 text-end')}>
                                                        {(`${item[keyItem]}`.trim().charAt(Number([item[keyItem].length - 1])) === 'D' ||
                                                            `${item[keyItem]}`.trim().charAt(Number([item[keyItem].length - 1])) === 'đ')
                                                            ? item[keyItem]
                                                                .replace(' VND', '')
                                                                .replace(' đ', '')
                                                                .replace('+', '')
                                                                .replace('-', '')
                                                                .replaceAll('.', ',')
                                                            : item[keyItem]
                                                                .replace('+', '')
                                                                .replace('-', '')
                                                                .replaceAll('.', ',')}
                                                    </span>}

                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    );
                })}
            </>
        );
    }, [arrKey, dataTableInvest, labelArr, renderLabel]);

    const renderTotalInvest = useMemo(() => {
        return (
            <div className={cx('period-container', 'column')}>
                <span className={cx('medium h7 text-center')}>{Languages.commission.total}</span>
                <div className={cx('row y20 space-between')}>
                    <span className={cx('text-gray h7 text-end')}>{Languages.commission.totalInvestAmount}</span>
                    <span className={cx('text-gray h7 text-end')}>{utils.formatMoneyToCommaAndNotSuffixes(total?.total_money_number || 0)}</span>
                </div>
                <div className={cx('row y20 space-between')}>
                    <span className={cx('text-gray h7 text-end')}>{Languages.commission.totalCommission}</span>
                    <span className={cx('text-gray h7 text-end')}>{utils.formatMoneyToCommaAndNotSuffixes(total?.money_commission_number || 0)}</span>
                </div>
            </div>
        );
    }, [total]);

    return (
        <div className={cx('table-container')}>
            {dataTableInvest?.length > 0
                ? <>
                    {renderPeriodInvest}
                    {total && renderTotalInvest}
                </>
                : (isLoading
                    ? <Spinner className={cx('spinner')} />
                    : <NoData description={description || ''} />)
            }
        </div>
    );
};

export default PeriodInvestMobile;
