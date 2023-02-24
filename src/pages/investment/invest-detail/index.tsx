import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ImgHeader from 'assets/image/img_home_header.jpg';
import styles from './invest-detail.module.scss';
import classNames from 'classnames/bind';
import IcLeftArrow from 'assets/image/ic_gray_small_arrow_left.svg';
import IcWhiteLeftArrow from 'assets/image/ic_white_left_arrow.svg';
import Languages from 'commons/languages';
import { Col, Row } from 'antd';
import { DataColumnHistoryType, DataColumnPaymentType, PackageInvest } from 'models/invest';
import IcRightArrow from 'assets/image/ic_white_small_right_arrow.svg';
import IcPopupAuth from 'assets/image/ic_popup_auth.svg';
import IcPopupVerify from 'assets/image/ic_popup_verify.svg';

import utils from 'utils/utils';
import PopupBaseCenterScreen from 'components/popup-base-center-screen';
import { PopupBaseActions } from 'components/modal/modal';
import { useAppStore } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routers/paths';
import useIsMobile from 'hooks/use-is-mobile.hook';
import TableInvest from 'components/table-invest';
import { arrInvestKey, arrKeyHistory, arrKeyHistoryMobile, arrKeyInvestMobile, columnNameHistory, columnNameInvest, labelArrHistory, labelInvestArr } from 'assets/static-data/invest';
import PeriodInvestMobile from 'components/period-invest-mobile';
import { AUTH_STATE, COLOR_TRANSACTION, Events, TABS_PROFILE, TAB_INDEX, TYPE_TAB_HISTORY } from 'commons/constants';
import Footer from 'components/footer';
import { observer } from 'mobx-react';
import { EventEmitter } from 'utils/event-emitter';

const cx = classNames.bind(styles);

const InvestDetail = observer(({ onBackScreen, onNextScreen, investPackage, isDetailHistory, tabDetailHistory }:
    {
        onBackScreen?: () => void,
        onNextScreen?: () => void,
        investPackage?: PackageInvest,
        isDetailHistory?: boolean,
        tabDetailHistory?: number // 0: investing, 1: đã đáo hạn
    }) => {

    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const { userManager, apiServices } = useAppStore();

    const [dataPeriodInvest, setDataPeriodInvest] = useState<DataColumnPaymentType[]>([]);
    const [dataDetailHistory, setDataDetailHistory] = useState<DataColumnHistoryType[]>([]);

    const [tabDetailHistoryNumber] = useState<number>(tabDetailHistory || 0);

    const popupAuthRef = useRef<PopupBaseActions>(null);
    const popupAccVerifyRef = useRef<PopupBaseActions>(null);

    useEffect(() => {
        if (isDetailHistory) {
            fetchDetailHistoryInvest();
        } else {
            fetchDataPeriodInvest();
        }
    }, [isDetailHistory]);

    const onBack = useCallback(() => {
        onBackScreen?.();
    }, [onBackScreen]);

    const onNextPage = useCallback(() => {
        onNextScreen?.();
    }, [onNextScreen]);

    const fetchDataPeriodInvest = useCallback(async () => {
        if (investPackage) {
            const resultPeriodInvest = await apiServices.invest.getInvestDetail(investPackage.id) as any;
            if (resultPeriodInvest.success) {
                const dataResultPeriodInvest = resultPeriodInvest?.payment as DataColumnPaymentType[];
                setDataPeriodInvest(dataResultPeriodInvest);
            }
        }
    }, [apiServices.invest, investPackage]);

    const fetchDetailHistoryInvest = useCallback(async () => {
        if (investPackage) {
            const resInvestHistory = await apiServices.invest.getInvestHaveContract(`${investPackage?.id}`) as any;
            if (resInvestHistory.success) {
                const history = resInvestHistory.history as DataColumnHistoryType[];
                setDataDetailHistory(history);
            }
        }
    }, [apiServices.invest, investPackage]);

    const renderKeyValue = useCallback((_key?: string, _value?: string) => {
        return (
            <div className={cx('key-value-container')}>
                <span className={cx(isMobile ? 'text-gray h7' : 'text-gray h6')}>{_key}</span>
                <span className={cx(isMobile ? 'text-gray h7 medium' : 'text-gray h6 medium')}>{_value}</span>
            </div>
        );
    }, [isMobile]);

    const handleInvestNow = useCallback(() => {
        if (!userManager.userInfo) {
            popupAuthRef.current?.showModal();
        } else if (userManager?.userInfo?.tinh_trang?.color !== COLOR_TRANSACTION.GREEN) {
            popupAccVerifyRef.current?.showModal();
        } else {
            onNextPage();
        }
    }, [onNextPage, userManager.userInfo]);

    const renderPopup = useCallback((
        _ref: any,
        _labelLeft?: string,
        _labelRight?: string,
        _icon?: any,
        _title?: string,
        _describe?: string
    ) => {
        const handleLeftButton = () => {
            if (_title === Languages.invest.noteAuth) {
                navigate(Paths.auth, { state: { name: AUTH_STATE.LOGIN } });
            } else {
                // 
            }
        };

        const handleRightButton = () => {
            if (_title === Languages.invest.noteAuth) {
                navigate(Paths.auth, { state: { name: AUTH_STATE.REGISTER } });
            } else {
                EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.PROFILE, TABS_PROFILE.INFO_IDENTITY);
            }
        };
        return (
            <PopupBaseCenterScreen
                ref={_ref}
                labelSuccess={_labelRight}
                labelCancel={_labelLeft}
                hasTwoButton
                onClose={handleLeftButton}
                onSuccessPress={handleRightButton}
                icon={_icon}
                textDescribeStyle={cx('describe-popup-style')}
                hasCloseIc
                title={_title}
                description={_describe} />
        );
    }, [navigate]);

    const renderDetailPackage = useMemo(() => {
        return (
            <div className={cx(isMobile ? 'content-invest-container-mobile' : 'content-invest-container')}>
                <span className={cx('info-contract-text')}>{Languages.invest.infoContract}</span>
                <span className={cx(isMobile ? 'amount-invest-mobile-text' : 'amount-invest-text')}>{investPackage?.so_tien_dau_tu.replace(' VND', '')}</span>
                <Row gutter={[24, 0]} className={cx('invest-wrap')}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('column-wrap')}>
                        {renderKeyValue(Languages.invest.contractId, investPackage?.ma_hop_dong)}
                        {isDetailHistory &&
                            renderKeyValue(
                                Languages.historyDetail.remainingOriginalAmount,
                                utils.formatLoanMoney(investPackage?.tong_goc_con_lai))
                        }
                        {isDetailHistory &&
                            renderKeyValue(
                                Languages.historyDetail.receivedOriginalAmount,
                                utils.formatLoanMoney(investPackage?.tong_goc_da_tra))
                        }
                        {renderKeyValue(Languages.invest.investmentTerm, investPackage?.thoi_gian_dau_tu)}
                        {isDetailHistory && renderKeyValue(Languages.historyDetail.dateInvest, investPackage?.ngay_dau_tu)}
                        {isDetailHistory
                            ? renderKeyValue(
                                tabDetailHistoryNumber !== TYPE_TAB_HISTORY.EXPIRED ? Languages.invest.expectedDueDate : Languages.invest.expectedDate,
                                investPackage?.ngay_dao_han)
                            : renderKeyValue(Languages.invest.expectedDueDate, investPackage?.ngay_dao_han_du_kien)
                        }
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('column-wrap')}>
                        {renderKeyValue(Languages.invest.totalProfitReceived, utils.formatLoanMoney(investPackage?.tong_lai_nhan_duoc))}
                        {renderKeyValue(Languages.invest.interestYear, investPackage?.ti_le_lai_suat_hang_nam)}
                        {renderKeyValue(Languages.invest.monthlyInterest, utils.formatLoanMoney(investPackage?.lai_hang_thang))}
                        {isDetailHistory &&
                            renderKeyValue(
                                Languages.historyDetail.receivedInterest,
                                utils.formatLoanMoney(investPackage?.tong_lai_da_tra))
                        }
                        {isDetailHistory &&
                            renderKeyValue(
                                Languages.historyDetail.remainingInterest,
                                utils.formatLoanMoney(investPackage?.tong_lai_con_lai))
                        }
                        {renderKeyValue(Languages.invest.formInterest, investPackage?.hinh_thuc_tra_lai)}
                    </Col>
                </Row>
                {!isDetailHistory && <div className={cx('invest-now-wrap')}>
                    <div className={cx('invest-now-container')} onClick={handleInvestNow} >
                        <span className={cx('invest-now-text')}>{Languages.invest.investNow}</span>
                        <img src={IcRightArrow} className={cx('ic_arrow')} />
                    </div>
                </div>}
            </div>
        );
    }, [isMobile, investPackage, renderKeyValue, isDetailHistory, tabDetailHistoryNumber, handleInvestNow]);

    const renderDetailPayment = useMemo(() => {
        return (
            <div className={cx(isMobile ? 'invest-note-container-mobile' : 'invest-note-container')}>
                <span className={cx('invest-note-text')}>
                    {isDetailHistory
                        ? Languages.historyDetail.payInterestInfo
                        : Languages.invest.estimatedPaymentSchedule}
                </span>
                {isMobile
                    ? <PeriodInvestMobile
                        dataTableInvest={isDetailHistory ? dataDetailHistory : dataPeriodInvest}
                        labelArr={isDetailHistory ? labelArrHistory : labelInvestArr}
                        arrKey={isDetailHistory ? arrKeyHistoryMobile : arrKeyInvestMobile}
                    />
                    : <TableInvest
                        dataTableInvest={isDetailHistory ? dataDetailHistory : dataPeriodInvest}
                        arrKey={isDetailHistory ? arrKeyHistory : arrInvestKey}
                        columnName={isDetailHistory ? columnNameHistory : columnNameInvest}
                    />
                }
            </div>
        );
    }, [dataDetailHistory, dataPeriodInvest, isDetailHistory, isMobile]);

    return (
        <div className={cx('page')}>
            <div className={cx('banner-container')}>
                <img src={ImgHeader} className={cx('banner')} />
                <div onClick={onBack}
                    className={cx(isMobile
                        ? (isDetailHistory ? 'back-mobile-history' : 'back-mobile')
                        : (isDetailHistory ? 'back-history' : 'back'))}>
                    <img src={isDetailHistory ? IcWhiteLeftArrow : IcLeftArrow} className={cx('ic-back')} />
                </div>
                <div className={cx('content-container')}>
                    <div className={cx('text-banner-container')}>
                        <span className={cx('invest-tien-ngay-text')}>{Languages.invest.investTienNgay}</span>
                        <span className={cx('invest-build-future-text')}>{Languages.invest.buildFuture}</span>
                        <span className={cx('describe-text')}>{Languages.invest.describe}</span>
                        {renderDetailPackage}
                        {renderDetailPayment}
                        <Footer />
                    </div>
                </div>
            </div>
            {renderPopup(popupAuthRef, Languages.auth.login, Languages.auth.register, IcPopupAuth, Languages.invest.noteAuth, Languages.invest.describeAuth)}
            {renderPopup(popupAccVerifyRef, Languages.invest.next, Languages.invest.verifyNow, IcPopupVerify, Languages.invest.noteVerify, Languages.invest.describeVerify)}
        </div>
    );
});

export default InvestDetail;
