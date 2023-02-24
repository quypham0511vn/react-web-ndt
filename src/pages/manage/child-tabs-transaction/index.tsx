import type { DatePickerProps } from 'antd';
import { Col, DatePicker, Row, Space } from 'antd';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './child-tabs-transaction.module.scss';
import IcFilter from 'assets/image/ic_green_small_filter.svg';
import { vi_locale } from 'assets/static-data/locale-date';
import { arrKeyTransactionMobile, arrKeyTransactionWeb, columnNameTransaction, labelArrTransactionMobile, TabTransaction } from 'assets/static-data/manage';
import { PAGE_SIZE_INVEST } from 'commons/configs';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import Footer from 'components/footer';
import { PopupBaseActions } from 'components/modal/modal';
import PeriodInvestMobile from 'components/period-invest-mobile';
import PopupBaseMobile from 'components/popup-base-mobile';
import ScrollTopComponent from 'components/scroll-top';
import TableInvest from 'components/table-invest';
import TabsButtonBar from 'components/tabs-button-bar';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { DataColumnTransactionType } from 'models/transaction';

const cx = classNames.bind(styles);
interface HistoryFilter {
    optionInvest?: string;
    fromDate?: string;
    toDate?: string;
}

function ChildTabsTransaction({ keyTabs }: { keyTabs: number }) {
    const isMobile = useIsMobile();
    const { apiServices } = useAppStore();

    const [dataFilter, setDataFilter] = useState<HistoryFilter>({
        optionInvest: 'all',
        fromDate: '',
        toDate: ''
    });

    const [isLoading, setLoading] = useState<boolean>(false);
    const [dataPeriodInvest, setDataPeriodInvest] = useState<DataColumnTransactionType[]>([]);
    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);
    const [tabName, setTabName] = useState<number>(keyTabs);

    const [isCall, setIsCall] = useState<boolean>(true);
    const [toggle, setToggle] = useState<boolean>(false);
    const popupSearchRef = useRef<PopupBaseActions>(null);
    const fromDateRef = useRef<any>(null);
    const toDateRef = useRef<any>(null);

    useEffect(() => {
        fetchDataFilter();
    }, [dataFilter]);

    const fetchDataFilter = useCallback(async (loadMore?: boolean, isCallApi?: boolean) => {
        if (isCall || isCallApi) {
            setLoading(true);
            const res = await apiServices.history.getTransactionList(
                dataFilter.fromDate || '',
                dataFilter.toDate || '',
                dataFilter.optionInvest,
                PAGE_SIZE_INVEST,
                loadMore ? offset : 0,
            ) as any;
            setLoading(false);
            if (res.success) {
                setCanLoadMore(res?.data?.length === PAGE_SIZE_INVEST);
                setOffset(last => !loadMore ? PAGE_SIZE_INVEST : last + PAGE_SIZE_INVEST);
                if (loadMore) {
                    setDataPeriodInvest(last => [...last, ...res.data]);
                } else {
                    setDataPeriodInvest(res?.data);
                }
            }
        }
    }, [apiServices.history, dataFilter, isCall, offset]);

    const renderDate = useCallback((_placeHolder: string, _value?: string, ref?: any) => {
        const onChangeInput: DatePickerProps['onChange'] = (date, dateString) => {
            const isFromDate = _placeHolder === Languages.history.fromDate;
            if (!isMobile) {
                setIsCall(true);
            }
            setOffset(0);
            if (dateString !== dataFilter.fromDate && isFromDate) {
                setDataFilter({ ...dataFilter, fromDate: dateString ? dateString : '' });
            } else if (dateString !== dataFilter.toDate && !isFromDate) {
                setDataFilter({ ...dataFilter, toDate: dateString ? dateString : '' });
            }
        };

        const limit = (d: any) => {
            if (_placeHolder === Languages.history.fromDate) return d.isAfter(dataFilter.toDate);
            return d.isBefore(dataFilter.fromDate);
        };

        return (
            <Col xs={12} sm={12} md={12} lg={12} xl={12} className={cx('picker-container')} >
                <Space direction="vertical" className={cx('space')}>
                    <DatePicker
                        locale={vi_locale}
                        onChange={onChangeInput}
                        picker="date"
                        className={cx('content-item-picker-text')}
                        placeholder={_placeHolder}
                        value={_value ? dayjs(_value) : undefined}
                        disabledDate={d => !d || limit(d) || d.isAfter(new Date().toISOString().slice(0, 10), 'date')}
                        format="YYYY-MM-DD"
                        ref={ref}
                    />
                </Space>
            </Col>
        );
    }, [dataFilter, isMobile, toggle]);

    const renderFilterWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('top-search-component')}>
                <Col xs={24} sm={24} md={12} lg={8} xl={14} className={cx(isMobile ? 'title-mobile' : 'title')}>
                    <span className={cx('text-gray8 medium h6')}>{Languages.transaction.infoTransactions}</span>
                </Col>
                {!isMobile &&
                    <Col xs={24} sm={24} md={24} lg={12} xl={10} >
                        <Row gutter={[16, 4]}>
                            {renderDate(Languages.history.fromDate, dataFilter.fromDate)}
                            {renderDate(Languages.history.toDate, dataFilter.toDate)}
                        </Row>
                    </Col>}
            </Row>
        );
    }, [dataFilter.fromDate, dataFilter.toDate, isMobile, renderDate]);

    const renderContentPopup = useMemo(() => {
        return (
            <Row gutter={[16, 4]}>
                <Col className={cx('picker-container')} xs={24} sm={24} md={24} lg={24} xl={24} >
                    <span className={cx('text-black h6')}>{Languages.invest.dateInvest}</span>
                </Col>
                {renderDate(Languages.history.fromDate, dataFilter.fromDate, fromDateRef)}
                {renderDate(Languages.history.toDate, dataFilter.toDate, toDateRef)}
            </Row>
        );
    }, [dataFilter, renderDate]);

    const onClosePopup = useCallback(() => {
        setToggle(last => !last);
        setDataFilter(last => {
            last.fromDate = '';
            last.toDate = '';
            fetchDataFilter(false, true);
            return last;
        });
        setOffset(0);
    }, [fetchDataFilter]);

    const onSuccessPopup = useCallback(() => {
        fetchDataFilter(false, true);
    }, [fetchDataFilter]);

    const renderPopupSearchPackage = useCallback(() => {
        return (
            <PopupBaseMobile ref={popupSearchRef}
                hasCloseIc
                customerContent={renderContentPopup}
                hasTwoButton
                labelCancel={Languages.invest.cancel}
                labelSuccess={Languages.common.search}
                titleHeader={Languages.transaction.search}
                buttonLeftStyle={BUTTON_STYLES.GRAY}
                onClose={onClosePopup}
                onSuccessPress={onSuccessPopup}
            />
        );
    }, [onClosePopup, onSuccessPopup, renderContentPopup]);

    const handleOpenPopupSearch = useCallback(() => {
        setIsCall(false);
        popupSearchRef.current?.showModal();
    }, []);

    const renderFilterMobile = useMemo(() => {
        return (
            <div className={cx('right-top-search-component')} onClick={handleOpenPopupSearch}>
                <span className={cx('text-green h7 x10')}>{Languages.common.search}</span>
                <img src={IcFilter} />
            </div>
        );
    }, [handleOpenPopupSearch]);

    const onChangeTab = useCallback((tabIndex: number, tabValue: string) => {
        if (tabName !== tabIndex) {
            setTabName(tabIndex);
            setDataFilter({ ...dataFilter, optionInvest: tabValue });
        }
    }, [dataFilter, tabName]);

    const loadMore = useCallback(() => {
        fetchDataFilter(true, true);
    }, [fetchDataFilter]);

    return (
        <div className={cx('page-container')}>
            <div className={cx('tabs-container')}>
                <TabsButtonBar dataTabs={TabTransaction} isMobile={isMobile} onChangeText={onChangeTab} defaultTabs={`${keyTabs}`} />
                {isMobile && renderFilterMobile}
            </div>
            <div className={cx('scroll-container')}>
                <div className={cx(isMobile ? 'table-mobile-container' : 'table-web-container')}>
                    {renderFilterWeb}
                    {isMobile
                        ? <PeriodInvestMobile
                            dataTableInvest={dataPeriodInvest}
                            labelArr={labelArrTransactionMobile}
                            isLoading={isLoading}
                            description={Languages.transaction.describeNoData}
                            arrKey={arrKeyTransactionMobile} />

                        : <TableInvest
                            dataTableInvest={dataPeriodInvest}
                            columnName={columnNameTransaction}
                            isLoading={isLoading}
                            description={Languages.transaction.describeNoData}
                            arrKey={arrKeyTransactionWeb} />}
                </div>
                <Row onClick={loadMore} className={cx('button-see-more')}>
                    {canLoadMore &&
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <Button
                                buttonStyle={BUTTON_STYLES.GREEN}
                                fontSize={20}
                                width={100}
                                labelStyles={cx('label-button-see-more')}
                                label={Languages.transaction.seeMoreTransaction}
                                isLoading={isLoading}
                                spinnerClass={cx('spinner')}
                                isLowerCase />
                        </Col>}
                </Row>
                <Footer />
            </div>
            {renderPopupSearchPackage()}
            <ScrollTopComponent nameClassScroll={cx('scroll-container')} />
        </div>
    );
}

export default ChildTabsTransaction;
