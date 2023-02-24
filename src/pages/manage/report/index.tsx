import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import ColumnChart from 'components/column-chart';
import Footer from 'components/footer';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { observer } from 'mobx-react';
import { ItemProps } from 'models/common';
import { DashBroadModel } from 'models/dash';
import { ReportChartModel, ReportYearModel } from 'models/report';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dateUtils from 'utils/date-utils';
import utils from 'utils/utils';
import styles from './report.module.scss';

const cx = classNames.bind(styles);

const Report = observer(() => {
    const isMobile = useIsMobile();
    const { apiServices } = useAppStore();

    const [yearList, setYearList] = useState<ItemProps[]>([]);
    const [dataYearFilter, setDataYearFilter] = useState<string>(`${dateUtils.getYear(new Date())}`);

    const [reportOverviewData, setReportOverviewData] = useState<DashBroadModel>({
        so_du: 0,
        tong_goc_con_lai: 0,
        tong_goc_da_tra: 0,
        tong_lai_con_lai: 0,
        tong_tien_dau_tu: 0,
        tong_tien_lai: 0
    });

    const [valueColumn, setValueColumn] = useState<ReportChartModel>({
        moneyInvestMent: [],
        initialMoney: [],
        interestMoney: [],
        label: []
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const pickerYearRef = useRef<PickerAction>(null);

    useEffect(() => {
        fetchSearch();
    }, []);

    useEffect(() => {
        setValueColumn({
            moneyInvestMent: [],
            initialMoney: [],
            interestMoney: [],
            label: []
        });
        fetchReportYear();
    }, [dataYearFilter]);

    const fetchSearch = useCallback(async () => {
        const resYear = await apiServices.report.getYear() as any;
        const resDashboard = await apiServices.common.getContractsDash() as any;

        if (resDashboard.success) {
            const dataDashboard = resDashboard?.data as DashBroadModel;
            setReportOverviewData(dataDashboard);
        }
        if (resYear.success) {
            const dataYear = utils.formatObjectToKeyLabel(resYear?.data as Object);
            setYearList(dataYear);
        }

    }, [apiServices.common, apiServices.report]);

    const fetchReportYear = useCallback(async () => {
        setIsLoading(true);
        const res = await apiServices.report.requestFinanceReport(dataYearFilter) as any;
        setIsLoading(false);

        if (res.success) {
            const dataMonths = res?.data as ReportYearModel[];
            const temp = dataMonths.map((item) => ({
                thang: item?.thang,
                nam: item?.nam,
                dau_tu: item?.dau_tu,
                goc_tra: item?.goc_tra,
                lai_tra: item?.lai_tra
            })) as ReportYearModel[];
            temp?.map((item: ReportYearModel) => {
                setValueColumn(last => {
                    last.moneyInvestMent = [...last.moneyInvestMent, Number(utils.formatRoundNumberToDecimalMillion(item?.dau_tu))];
                    last.initialMoney = [...last.initialMoney, Number(utils.formatRoundNumberToDecimalMillion(item?.goc_tra))];
                    last.interestMoney = [...last.interestMoney, Number(utils.formatRoundNumberToDecimalMillion(item?.lai_tra))];
                    last.label = [...last.label, `${'T'}${item?.thang}`];
                    return last;
                });
            });
        }

    }, [apiServices.report, dataYearFilter]);

    const renderKeyValue = useCallback((_key?: string, _value?: string, noBorder?: boolean) => {
        return (
            <div className={cx(noBorder ? 'no-border-key-value-container' : 'key-value-container')}>
                <span className={cx('text-gray h6')}>{_key}</span>
                <span className={cx('text-gray h6 medium')}>{_value}</span>
            </div>
        );
    }, []);

    const renderPicker = useCallback((_ref: any, _title: string, _data: ItemProps[], _defaultValue?: string) => {
        const onSelectItem = (item: string) => {
            if (item.length > 0) {
                setDataYearFilter(item);
            }
        };
        return (
            <PickerComponent ref={_ref} data={_data} onSelectItem={onSelectItem} defaultValue={_defaultValue} allowClear={true} />
        );
    }, []);

    const renderSearchWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx(isMobile ? 'filter-content-mobile' : 'filter-content')}>
                <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                    <span className={cx('report-text')}>{`${Languages.report.reportQuarter}${dataYearFilter}`}</span>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} >
                    {renderPicker(pickerYearRef, Languages.report.year, yearList, dataYearFilter)}
                </Col>
            </Row>
        );
    }, [dataYearFilter, isMobile, renderPicker, yearList]);

    const renderChartReport = useMemo(() => {
        return (
            <div className={cx(isMobile ? 'chart-content-mobile' : 'chart-content')}>
                <span className={cx('chart-title-text')}>{Languages.report.financialChart}</span>
                <ColumnChart
                    dataChart={valueColumn}
                    isMobile={isMobile}
                    chartContainer={cx(isMobile ? 'chart-container-mobile' : 'chart-container')}
                    hideBarChart={isLoading}
                />
            </div>
        );
    }, [isMobile, valueColumn, isLoading]);

    return (
        <div className={cx('page-container')}>
            <div className={cx(isMobile ? 'all-content-container-mobile' : 'all-content-container')}>
                <Row gutter={[24, 0]} className={cx(isMobile ? 'row-content-mobile' : 'row-content')}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <span className={cx(isMobile ? 'overview-invest-text-mobile' : 'overview-invest-text')}>{Languages.report.overviewInvest}</span>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                        {renderKeyValue(Languages.report.totalInvestment, utils.formatLoanMoney(`${reportOverviewData?.tong_tien_dau_tu}`))}
                        {renderKeyValue(Languages.report.totalCapitalReceived, utils.formatLoanMoney(`${reportOverviewData?.tong_goc_da_tra}`))}
                        {renderKeyValue(Languages.report.totalRemainingCapital, utils.formatLoanMoney(`${reportOverviewData?.tong_goc_con_lai}`))}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                        {renderKeyValue(Languages.report.totalInterest, utils.formatLoanMoney(`${reportOverviewData?.tong_tien_lai}`))}
                        {renderKeyValue(Languages.report.totalProfitReceived, utils.formatLoanMoney(`${reportOverviewData?.so_du}`))}
                        {renderKeyValue(Languages.report.totalProfitRemaining, utils.formatLoanMoney(`${reportOverviewData?.tong_lai_con_lai}`), isMobile)}
                    </Col>
                </Row>
                {renderSearchWeb}
                {renderChartReport}
            </div>
            <Footer />
        </div>
    );
});

export default Report;
