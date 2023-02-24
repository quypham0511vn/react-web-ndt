import { Col, Row } from 'antd';
import IcFilter from 'assets/image/ic_green_small_filter.svg';
import classNames from 'classnames/bind';
import { PAGE_SIZE_INVEST } from 'commons/configs';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import Footer from 'components/footer';
import InvestItem from 'components/invest-item';
import { PopupBaseActions } from 'components/modal/modal';
import NoData from 'components/no-data';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import PopupBaseMobile from 'components/popup-base-mobile';
import ScrollTopComponent from 'components/scroll-top';
import Spinner from 'components/spinner';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { observer } from 'mobx-react';
import { ItemProps } from 'models/common';
import { InvestFilter, PackageInvest } from 'models/invest';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import utils from 'utils/utils';
import styles from './investment.module.scss';

const cx = classNames.bind(styles);

const Investment = observer(({ onNextScreen }: { onNextScreen: (data: PackageInvest) => void }) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices } = useAppStore();

    const [investList, setInvestList] = useState<PackageInvest[]>([]);
    const [dateList, setDateList] = useState<ItemProps[]>([]);
    const [amountList, setAmountList] = useState<ItemProps[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [dataTypeInterest, setDataTypeInterest] = useState<ItemProps[]>([]);

    const [dataFilter, setDataFilter] = useState<InvestFilter>({});
    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

    const [offset, setOffset] = useState<number>(0);

    const divRef = useRef<HTMLDivElement>(null);
    const popupSearchRef = useRef<PopupBaseActions>(null);
    const pickerTypeInterestRef = useRef<PickerAction>(null);
    const pickerAmountRef = useRef<PickerAction>(null);
    const pickerDateRef = useRef<PickerAction>(null);

    useEffect(() => {
        fetchFilterDataList();
    }, []);

    useEffect(() => {
        fetchPackageInvestList();
    }, [dataFilter]);

    const fetchFilterDataList = useCallback(async () => {
        const amountFilter = await apiServices.invest.getListMoneyInvestment() as any;
        const periodFilter = await apiServices.invest.getListTimeInvestment() as any;
        const typeInterest = await apiServices.invest.getListTypeInterest() as any;

        if (amountFilter.success) {
            const dataAmountFilter = utils.formatObjectFilterInvest(amountFilter?.data as Object);
            setAmountList(dataAmountFilter);
        }
        if (periodFilter.success) {
            const dataPeriodFilter = utils.formatObjectFilterInvest(periodFilter?.data as Object);
            setDateList(dataPeriodFilter);
        }

        if (typeInterest.success) {
            const listTypeInterest = utils.formatObjectFilterInvest(typeInterest?.data as Object);
            setDataTypeInterest(listTypeInterest);
        }
    }, [apiServices.invest]);

    const fetchPackageInvestList = useCallback(async (loadMore?: boolean) => {
        setLoading(true);
        const investmentList = await apiServices.invest.getAllContractInvest(
            dataFilter.typeInterest || '',
            dataFilter.dateInvest || '',
            dataFilter.amountInvest || '',
            offset,
            PAGE_SIZE_INVEST
        ) as any;
        setLoading(false);
        if (investmentList.success) {
            setCanLoadMore(investmentList?.data?.length === PAGE_SIZE_INVEST);
            setOffset(last => !loadMore ? PAGE_SIZE_INVEST : last + PAGE_SIZE_INVEST);
            if (loadMore) {
                setInvestList(last => [...last, ...investmentList.data]);
            } else {
                setInvestList(investmentList?.data);
            }
        }
    }, [apiServices.invest, dataFilter, offset]);

    const renderDivider = useCallback((_label: string, styleContainer?: string) => {
        return (
            <div className={cx(isMobile ? 'mobile-invest' : (styleContainer || 'invest-package-container'))}>
                <span className={cx(isMobile ? 'invest-package-mobile-text' : 'invest-package-text')}>{_label}</span>
                <div className={cx('invest-package-bar')} />
            </div>
        );
    }, [isMobile]);

    const renderPicker = useCallback((_ref: any, _title: string, _placeholder: string, _data: ItemProps[]) => {
        const onSelectItem = (item: string) => {
            if (item && !isMobile) {
                setOffset(0);
                setDataFilter({
                    dateInvest: _title === Languages.invest.dateInvest ? item : dataFilter.dateInvest,
                    amountInvest: _title === Languages.invest.investAmount ? item : dataFilter.amountInvest,
                    typeInterest: _title === Languages.invest.typeInterest ? item : dataFilter.typeInterest
                });
            }
        };
        const handleDataFilter = () => {
            setOffset(0);
            setDataFilter({
                dateInvest: _title === Languages.invest.dateInvest ? '' : dataFilter.dateInvest,
                amountInvest: _title === Languages.invest.investAmount ? '' : dataFilter.amountInvest,
                typeInterest: _title === Languages.invest.typeInterest ? '' : dataFilter.typeInterest
            });
        };
        return (
            <Col className={cx('picker-container')} xs={isMobile ? 24 : 12} sm={12} md={12} lg={12} xl={8} >
                <PickerComponent ref={_ref}
                    data={_data}
                    title={_title}
                    placeholder={_placeholder}
                    onSelectItem={onSelectItem}
                    onClear={handleDataFilter}
                    allowClear={isMobile ? true : false}
                />
            </Col>
        );
    }, [dataFilter.amountInvest, dataFilter.dateInvest, dataFilter.typeInterest, isMobile]);

    const renderTopWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('top-search-component')}>
                {renderPicker(pickerTypeInterestRef, Languages.invest.typeInterest, Languages.invest.chooseTypeInterest, dataTypeInterest)}
                {renderPicker(pickerAmountRef, Languages.invest.investAmount, Languages.invest.investAmountChoose, amountList)}
                {renderPicker(pickerDateRef, Languages.invest.dateInvest, Languages.invest.dateInvestChoose, dateList)}
            </Row>
        );
    }, [amountList, dataTypeInterest, dateList, renderPicker]);

    const handleOpenPopupSearch = useCallback(() => {
        popupSearchRef.current?.showModal();
    }, []);

    const onClosePopup = useCallback(() => {
        pickerAmountRef.current?.clearValue?.();
        pickerDateRef.current?.clearValue?.();
        setDataFilter({});
        setOffset(0);
    }, []);

    const onSuccessPopup = useCallback(() => {
        setOffset(0);
        setDataFilter({
            ...dataFilter,
            amountInvest: pickerAmountRef.current?.getValue() || '',
            dateInvest: pickerDateRef.current?.getValue() || '',
            typeInterest: pickerTypeInterestRef.current?.getValue() || ''
        });
    }, [dataFilter]);

    const renderPopupSearchPackage = useCallback(() => {
        return (
            <PopupBaseMobile ref={popupSearchRef}
                hasCloseIc
                customerContent={renderTopWeb}
                hasTwoButton
                labelCancel={Languages.invest.cancel}
                labelSuccess={Languages.common.search}
                titleHeader={Languages.invest.searchInvestPackage}
                buttonLeftStyle={BUTTON_STYLES.GRAY}
                onClose={onClosePopup}
                onSuccessPress={onSuccessPopup}
            />
        );
    }, [onClosePopup, onSuccessPopup, renderTopWeb]);

    const renderTopMobile = useMemo(() => {
        return (
            <div className={cx('top-search-mobile-component')}>
                <span className={cx('text-your-mobile-chance')}>{Languages.invest.products}</span>
                <div className={cx('right-top-search-component')} >
                    <div className={cx('filter-mobile-container')} onClick={handleOpenPopupSearch} >
                        <span className={cx('text-green h7 x10')}>{Languages.common.search}</span>
                        <img src={IcFilter} />
                    </div>
                    <span className={cx('text-red h7 xl10')} onClick={onClosePopup}>{Languages.common.filterCancel}</span>
                </div>
            </div>
        );
    }, [handleOpenPopupSearch, onClosePopup]);

    const renderItemInvest = useCallback((index: number, dataInvest: PackageInvest) => {
        const onNavigateInvestDetail = () => {
            onNextScreen(dataInvest);
        };
        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} className={cx('top-intro')} key={`${index}${dataInvest.id}`}>
                <InvestItem onPressInvest={onNavigateInvestDetail} dataInvest={dataInvest} />
            </Col>
        );
    }, [onNextScreen]);

    const renderInvestList = useCallback((_dataList?: any) => {
        return (
            <div className={cx(isMobile ? 'content-mobile-container' : 'content-web-container')} >
                <Row gutter={isMobile ? [24, 36] : [24, 44]}>
                    {_dataList?.map((itemInvest: PackageInvest, index: number) => {
                        return renderItemInvest(index, itemInvest);
                    })}
                </Row>
            </div>

        );
    }, [isMobile, renderItemInvest]);

    const renderFlatList = useCallback((_list: PackageInvest[]) => {
        const loadMore = () => {
            fetchPackageInvestList(true);
        };
        return (
            <div className={cx('bottom-container')} >
                {renderDivider(Languages.invest.investPackage)}
                {investList.length > 0
                    ? renderInvestList(_list)
                    : (isLoading
                        ? <Spinner className={cx('spinner-loading')} />
                        : <>
                            <NoData description={Languages.invest.noDataInvestFilter} />
                        </>
                    )}
                <Row gutter={[24, 44]} className={cx(isMobile ? 'button-see-more-mobile' : 'button-see-more')} >
                    {canLoadMore &&
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <Button
                                fontSize={20}
                                width={100}
                                labelStyles={cx('label-button-see-more')}
                                buttonStyle={BUTTON_STYLES.GREEN}
                                label={Languages.invest.seeMore}
                                isLoading={isLoading}
                                spinnerClass={cx('spinner')}
                                isLowerCase onPress={loadMore} />
                        </Col>}
                </Row>
                <Footer />
            </div>
        );
    }, [renderDivider, investList.length, renderInvestList, isLoading, isMobile, canLoadMore, fetchPackageInvestList]);

    return (
        <div className={cx('page')}>
            <div className={cx('page-header')} ref={divRef} >
                {isMobile ? renderTopMobile : renderTopWeb}
            </div>
            {renderFlatList(investList)}
            <ScrollTopComponent nameClassScroll={cx('bottom-container')} />
            {renderPopupSearchPackage()}
        </div>
    );
});

export default Investment;
