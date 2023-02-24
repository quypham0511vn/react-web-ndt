import { Col, Row } from 'antd';
import IcLeftArrow from 'assets/image/ic_white_left_arrow.svg';
import IcRightArrow from 'assets/image/ic_white_small_right_arrow.svg';
import ImgHeader from 'assets/image/img_home_header.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { PackageInvest } from 'models/invest';
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './invest-package-verify.module.scss';

import CheckBox, { CheckBoxAction } from 'components/check-box';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { useNavigate } from 'react-router-dom';
import utils from 'utils/utils';
import RadioInvestMethod, { RadioAction } from 'components/radio-invest-method';
import { InvestMethod } from 'assets/static-data/invest';
import { COLOR_TRANSACTION, Events, TABS_INVEST, TABS_PROFILE, TAB_INDEX, TYPE_TRANSFER_AMOUNT } from 'commons/constants';
import Footer from 'components/footer';
import toasty from 'utils/toasty';
import { observer } from 'mobx-react';
import { EventEmitter } from 'utils/event-emitter';
import PopupBaseCenterScreen from 'components/popup-base-center-screen';
import { PopupBaseActions } from 'components/modal/modal';
import Spinner from 'components/spinner';
import IcSuccess from 'assets/icon/ic_success_invest.svg';
import { Button } from 'components/button';
import IcCancel from 'assets/image/ic_cancel.svg';
import IcSave from 'assets/image/ic_save.svg';
import IcMaintain from 'assets/icon/ic_maintain.svg';
import IcPopupBankVerify from 'assets/icon/ic_card_bank.svg';

interface DataNganLuong {
    bill_id?: number;
    link?: string;
    messageErr?: string;
}
const cx = classNames.bind(styles);
const RESEND_TIME = 5;

const InvestPackageVerify = observer(({ onBackDetail, onNextScreen, onSuccessInvestPackage, investPackage }: {
    onBackDetail: () => void,
    onNextScreen: () => void,
    onSuccessInvestPackage?: () => void,
    investPackage?: PackageInvest
}) => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const { userManager, apiServices } = useAppStore();

    const [dataPackage, setDataPackage] = useState<PackageInvest>();

    const [isCheckbox, setCheckbox] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [investMethod, setInvestMethod] = useState<string>('');
    const [timer, setTimer] = useState<number>(RESEND_TIME);
    const [openTab, setOpenTab] = useState<any>();
    const [dataNganLuong, setDataNganLuong] = useState<DataNganLuong>({
        bill_id: 0,
        link: '',
        messageErr: ''
    });
    const refPopupFillBankInfo = useRef<PopupBaseActions>(null);
    const refPopupNganLuong = useRef<PopupBaseActions>(null);
    const refSuccessInvest = useRef<PopupBaseActions>(null);
    const refMessageErr = useRef<PopupBaseActions>(null);
    const refCheckBox = useRef<CheckBoxAction>(null);
    const refRadio = useRef<RadioAction>(null);
    const mounted = useRef<boolean>(false);
    const intervalRef = useRef<any>();

    useEffect(() => {
        mounted.current = true;
        checkBill();
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer((t: any) => t - 1);
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, [timer]);

    useEffect(() => {
        if (timer === 0) {
            checkBill();
        }
    }, [timer]);

    useEffect(() => {
        setDataPackage(investPackage);
    }, [investPackage]);

    const onBack = useCallback(() => {
        onBackDetail();
    }, [onBackDetail]);

    const onNavigateTransferBank = useCallback(async () => {
        onNextScreen();
    }, [onNextScreen]);

    const onNavigateTransferNganLuong = useCallback(async () => {
        const resPaymentNganLuong = await apiServices.invest.requestNganLuong(`${investPackage?.id}`, 'web') as any;
        if (resPaymentNganLuong.success && resPaymentNganLuong.data) {
            setLoading(true);
            setDataNganLuong({
                link: resPaymentNganLuong.data as string,
                bill_id: resPaymentNganLuong.bill_id as number
            });
            refPopupNganLuong.current?.showModal();
            setTimeout(() => {
                setOpenTab(window.open(resPaymentNganLuong?.data as string));
            }, 1000);
        } else {
            setDataNganLuong({
                messageErr: resPaymentNganLuong?.data?.message
            });
            refMessageErr.current?.showModal();
        }
    }, [apiServices.invest, investPackage?.id]);

    const checkBill = useCallback(async () => {
        if (Number(dataNganLuong.bill_id)) {
            const res = await apiServices.invest.checkBill(`${dataNganLuong.bill_id}`) as any;
            if (res?.success && res.data === true) {
                setLoading(false);
                refPopupNganLuong.current?.hideModal();
                openTab?.close();
                setTimeout(() => {
                    refSuccessInvest.current?.showModal();
                }, 1000);
            } else if (mounted.current) {
                setTimer(RESEND_TIME);
            }
        }
    }, [apiServices.invest, dataNganLuong.bill_id, openTab]);

    const renderKeyValue = useCallback((_key?: string, _value?: string, _redValue?: boolean, noBorder?: boolean) => {
        return (
            <div className={cx(noBorder ? 'no-border-key-value-container' : 'key-value-container')}>
                <span className={cx('text-gray h6')}>{_key}</span>
                <span className={_redValue ? cx('text-red h6 medium') : cx('text-gray h6 medium')}>
                    {_value}
                </span>
            </div>
        );
    }, []);

    const handleInvestNow = useCallback(() => {
        if (isCheckbox) {
            if (userManager.userInfo?.tinh_trang?.color === COLOR_TRANSACTION.RED) {
                toasty.warn(Languages.invest.unconfirmed);
            } else if (userManager.userInfo?.tinh_trang?.color === COLOR_TRANSACTION.YELLOW) {
                toasty.warn(Languages.invest.waitingConfirm);
            } else if (!userManager.userInfo?.tra_lai?.type_interest_receiving_account) {
                toasty.warn(Languages.invest.noAccount);
            } else if (investMethod === TYPE_TRANSFER_AMOUNT.BANK) {
                if (userManager.userInfo?.tra_lai?.name_bank_account) {
                    onNavigateTransferBank();
                } else {
                    refPopupFillBankInfo.current?.showModal();
                }
            } else if (investMethod === TYPE_TRANSFER_AMOUNT.NGAN_LUONG) {
                onNavigateTransferNganLuong();
            } else if (!investMethod) {
                toasty.warn(Languages.invest.choosePaymentMethod);
            }
        } else {
            toasty.warn(Languages.invest.agreePolicyToInvest);
        }
    }, [investMethod, isCheckbox, onNavigateTransferBank, onNavigateTransferNganLuong, userManager.userInfo?.tinh_trang?.color, userManager.userInfo?.tra_lai]);

    const handlePopupPolicy = useCallback(() => {
        EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.PROFILE, TABS_PROFILE.POLICY);
    }, []);

    const renderLabelCheckbox = Languages.invest.agreePolicy.split('').map((character: string, index: number) => {
        return (
            <span className={cx('agree-policy-text-wrap')} key={index}>{
                character === '$'
                    ? <span className={cx('agree-policy-text')} onClick={handlePopupPolicy}>{Languages.invest.policy}</span>
                    : character
            }</span>
        );
    });

    const renderInvestMethod = useCallback(() => {
        const onChooseMethod = (event: any) => {
            setInvestMethod(event.target?.value);
        };
        const changeCheckboxStatus = (event: any) => {
            setCheckbox(event.target.checked);
        };
        return (
            <div className={cx('invest-method-container')}>
                <span className={cx('invest-method-text')}>{Languages.invest.investMethod}</span>
                <RadioInvestMethod ref={refRadio}
                    data={InvestMethod}
                    defaultValue={investMethod}
                    onChangeText={onChooseMethod} />
                <CheckBox ref={refCheckBox}
                    title={renderLabelCheckbox}
                    onChangeText={changeCheckboxStatus}
                    groupCheckBoxContainer={cx('group-check-box-container')} />
            </div>
        );
    }, [investMethod, renderLabelCheckbox]);

    const renderButtonInvestNow = useMemo(() => {
        return (
            <div className={cx(isMobile ? 'invest-now-wrap-mobile' : 'invest-now-wrap')}>
                {!isLoading && <div className={cx(isMobile ? 'invest-now-container-mobile' : 'invest-now-container')} onClick={handleInvestNow} >
                    <span className={cx('invest-now-text')}>{Languages.invest.investNow}</span>
                    <img src={IcRightArrow} className={cx('ic_arrow')} />
                </div>}
            </div>
        );
    }, [handleInvestNow, isLoading, isMobile]);

    const onClosePopupNganLuong = useCallback(() => {
        setDataNganLuong({});
        setCheckbox(false);
        setInvestMethod('');
        refCheckBox.current?.clearValue?.();
        refRadio.current?.setValue?.('');
        openTab?.close();
        refPopupNganLuong.current?.hideModal();
        setLoading(false);
    }, [openTab]);

    const onTransferSuccess = useCallback(() => {
        onClosePopupNganLuong();
        refSuccessInvest.current?.showModal();
        setLoading(true);
    }, [onClosePopupNganLuong]);

    const renderPopupNganLuong = useMemo(() => {
        if (`${dataNganLuong?.link}`.length > 0) {
            return <>
                {isLoading &&
                    <div className={cx('modal-ngan-luong')}>
                        <Spinner className={cx('spinner')} />
                        <span className={cx('text-black h5 medium center text-center')}>{Languages.invest.descriptionLoadingNganLuong[0]}</span>
                        <span className={cx('text-gray h6 center y15')}>{Languages.invest.descriptionLoadingNganLuong[1]}</span>
                        <span className={cx('text-red h6 center y15 b40')}>{Languages.invest.descriptionLoadingNganLuong[2]}</span>
                        <div className={cx('wid-100', 'row y20')}>
                            <Button
                                label={Languages.invest.transferSuccess}
                                labelStyles={cx('text-white h7 medium')}
                                containButtonStyles={cx('btn-container')}
                                isLowerCase
                                rightIcon={IcSave}
                                onPress={onTransferSuccess}
                            />
                            <Button
                                label={Languages.common.cancel}
                                labelStyles={cx('text-red h7 medium')}
                                containButtonStyles={cx('btn-cancel')}
                                isLowerCase
                                rightIcon={IcCancel}
                                onPress={onClosePopupNganLuong}
                            />
                        </div>
                    </div>
                }</>;
        }
    }, [dataNganLuong?.link, isLoading, onClosePopupNganLuong, onTransferSuccess]);

    const renderPackage = useMemo(() => {
        return (
            <div className={cx('content-invest-container')}>
                <span className={cx('info-contract-text')}>{Languages.invest.infoContract}</span>
                <span className={cx('amount-invest-text')}>{dataPackage?.so_tien_dau_tu.replace(' VND', '')}</span>
                <div className={cx('invest-wrap')}>
                    <Row gutter={[24, 0]} >
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            {renderKeyValue(Languages.invest.contractId, dataPackage?.ma_hop_dong)}
                            {renderKeyValue(Languages.invest.investmentTerm, dataPackage?.thoi_gian_dau_tu)}
                            {renderKeyValue(Languages.invest.expectedDueDate, dataPackage?.ngay_dao_han_du_kien)}
                            {renderKeyValue(Languages.invest.amountDemandedForInvestment, utils.formatLoanMoney(dataPackage?.so_tien_dau_tu), true)}
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            {renderKeyValue(Languages.invest.totalProfitReceived, utils.formatLoanMoney(dataPackage?.tong_lai_nhan_duoc))}
                            {renderKeyValue(Languages.invest.monthlyInterestRate, dataPackage?.ti_le_lai_suat_hang_thang)}
                            {renderKeyValue(Languages.invest.monthlyInterest, utils.formatLoanMoney(dataPackage?.lai_hang_thang))}
                            {renderKeyValue(Languages.invest.formInterest, dataPackage?.hinh_thuc_tra_lai, false, isMobile ? true : false)}
                        </Col>
                    </Row>
                </div>
                {!isMobile && renderInvestMethod()}
                {!isMobile && renderButtonInvestNow}
            </div>
        );
    }, [dataPackage, isMobile, renderButtonInvestNow, renderInvestMethod, renderKeyValue]);

    const handleInvestMore = useCallback(() => {
        EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.INVESTMENT, TABS_INVEST.INVESTMENT);
    }, []);

    const handleDetailSeen = useCallback(() => {
        onSuccessInvestPackage?.();
    }, [onSuccessInvestPackage]);

    const onClosePopupBank = useCallback(() => {
        setCheckbox(false);
        setInvestMethod('');
        refCheckBox.current?.clearValue?.();
        refRadio.current?.setValue?.('');
        refPopupFillBankInfo.current?.hideModal();
    }, []);

    const handleNavigateBankInfo = useCallback(() => {
        EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.PROFILE, TABS_PROFILE.INFO_PAYMENT);
    }, []);

    const renderPopup = useCallback((ref: PopupBaseActions | any,
        title: string,
        width?: string,
        customerContent?: ReactNode,
        icon?: any,
        hasCloseIc?: boolean,
        description?: string,
        imgStyle?: string,
        labelSuccess?: string,
        labelCancel?: string,
        onClose?: () => void,
        onSuccessPress?: () => void,
        hasTwoButton?: boolean
    ) => {
        return (
            <PopupBaseCenterScreen
                ref={ref}
                title={title}
                description={description}
                textTitleStyle={cx('label-popup-style')}
                textDescribeStyle={cx('describe-popup-style')}
                imgStyle={cx(imgStyle)}
                labelSuccess={labelSuccess}
                labelCancel={labelCancel}
                hasTwoButton={hasTwoButton}
                hasCloseIc={hasCloseIc}
                onClose={onClose}
                onSuccessPress={onSuccessPress}
                width={width}
                icon={icon}
                customerContent={customerContent}
            />
        );
    }, []);

    return (
        <div className={cx('page')}>
            <div className={cx('banner-container')}>
                <img src={ImgHeader} className={cx('banner')} />
                <div onClick={onBack} className={cx(isMobile ? 'back-mobile' : 'back')}>
                    <img src={IcLeftArrow} className={cx('ic-back')} />
                </div>
                <div className={cx('text-banner-container')}>
                    <span className={cx('invest-tien-ngay-text')}>{Languages.invest.investTienNgay}</span>
                    <span className={cx('invest-build-future-text')}>{Languages.invest.buildFuture}</span>
                    <span className={cx('describe-text')}>{Languages.invest.describe}</span>
                    {renderPackage}

                    {isMobile && <div className={cx('invest-note-container-mobile')}>
                        <span className={cx('invest-note-text')}>{Languages.invest.verifyInvest}</span>
                        {renderInvestMethod()}
                        {renderButtonInvestNow}
                    </div>}
                    <Footer />
                </div>
            </div>
            {renderPopup(
                refPopupNganLuong,
                Languages.invest.paymentNganLuong,
                isMobile ? '100%' : '70%',
                renderPopupNganLuong
            )}
            {renderPopup(
                refPopupFillBankInfo,
                Languages.invest.updateBankInfo,
                isMobile ? '100%' : '60%',
                undefined,
                IcPopupBankVerify,
                false,
                Languages.invest.bankAccountEmpty,
                'img-bank-style',
                Languages.common.update,
                Languages.invest.next,
                onClosePopupBank,
                handleNavigateBankInfo,
                true
            )}
            {renderPopup(
                refSuccessInvest,
                Languages.invest.investSuccess,
                isMobile ? '100%' : '60%',
                undefined,
                IcSuccess,
                false,
                Languages.invest.noteInvestSuccess,
                'img-style',
                Languages.invest.seeListInvesting,
                Languages.invest.investMore,
                handleInvestMore,
                handleDetailSeen,
                true
            )}
            {renderPopup(
                refMessageErr,
                '',
                isMobile ? '100%' : '50%',
                undefined,
                IcMaintain,
                true,
                dataNganLuong.messageErr,
                'img-maintain-style'
            )}
        </div>
    );
});

export default InvestPackageVerify;

