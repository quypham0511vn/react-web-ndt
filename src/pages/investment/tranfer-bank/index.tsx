import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { BankInformationModel, PackageInvest } from 'models/invest';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './transfer-bank.module.scss';
import IcWarning from 'assets/image/ic_red_small_warning.svg';
import IcDownload from 'assets/image/ic_green_download.svg';
import { observer } from 'mobx-react';
import IcLeftArrow from 'assets/image/ic_gray_small_arrow_left.svg';
import IcSuccess from 'assets/icon/ic_success_invest.svg';
import IcCancel from 'assets/image/ic_cancel.svg';
import IcSave from 'assets/image/ic_save.svg';
import IcMaintain from 'assets/icon/ic_maintain.svg';
import utils from 'utils/utils';
import Footer from 'components/footer';
import toasty from 'utils/toasty';
import dateUtils from 'utils/date-utils';
import { Loading } from 'components/loading';
import { PopupBaseActions } from 'components/modal/modal';
import PopupBaseCenterScreen from 'components/popup-base-center-screen';
import { EventEmitter } from 'utils/event-emitter';
import { Events, TABS_INVEST, TAB_INDEX } from 'commons/constants';
import { Button } from 'components/button';
import Spinner from 'components/spinner';

const cx = classNames.bind(styles);

interface QrTransferData {
    qrCode: string;
    qrDataURL: string;
}
const RESEND_TIME = 5;

const TransferBank = observer(({ goBack, onNextScreen, investPackage, onSuccessInvestPackage }: {
    goBack: () => void,
    onNextScreen: (data: PackageInvest) => void,
    investPackage?: PackageInvest,
    onSuccessInvestPackage?: () => void
}) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices } = useAppStore();

    const [qrUrl, setQrUrl] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [bankInfo, setBankInfo] = useState<BankInformationModel>();

    const [timer, setTimer] = useState<number>(RESEND_TIME);

    const mounted = useRef<boolean>(false);

    const intervalRef = useRef<any>();
    const refSuccessInvest = useRef<PopupBaseActions>(null);
    const refMaintain = useRef<PopupBaseActions>(null);

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
        if (timer === 0 && !message) {
            checkBill();
        }
    }, [timer, message]);

    useEffect(() => {
        fetchQRCode();
    }, []);

    const checkBill = useCallback(async () => {
        const res = await apiServices.invest.checkBill(`${investPackage?.id}`) as any;
        if (res?.success && res.data === true) {
            setTimeout(() => {
                refSuccessInvest.current?.showModal();
            }, 3000);
        } else if (mounted.current) {
            setTimer(RESEND_TIME);
        }
    }, [apiServices.invest, investPackage?.id]);

    const fetchQRCode = useCallback(async () => {
        const resPayment = await apiServices.invest.getInvestBankInfo(`${investPackage?.id}`, 'web') as any;
        if (resPayment?.success && resPayment?.data) {
            const bankInfoInvest = resPayment?.data?.bill as BankInformationModel;
            setBankInfo(bankInfoInvest);

            if (bankInfoInvest) {
                const fetchQRImg = await apiServices.invest.createQRTransferBank(
                    Number(bankInfoInvest?.account),
                    `${bankInfoInvest?.name_account}`,
                    Number(bankInfoInvest?.bin),
                    Number(utils.formatTextToNumber(bankInfoInvest?.money)),
                    `${bankInfoInvest?.description}`
                );
                const dataFetch = fetchQRImg?.data as QrTransferData;
                setQrUrl(dataFetch?.qrDataURL);
            }
        } else {
            setMessage(resPayment?.data?.message);
            refMaintain.current?.showModal?.();
        }

    }, [apiServices.invest, investPackage?.id]);

    const renderBankInfoCell = useCallback((_title?: string, _value?: string, haveCopy?: boolean) => {
        const onCopy = () => {
            navigator.clipboard.writeText(_value || '');
            toasty.success(Languages.transferBank.copySuccess);
        };
        return (
            <>
                <span className={cx('receiver-transfer-amount-text')}>{_title}</span>
                <div className={cx('bank-info-cell')}>
                    {_value
                        ? <span className={cx('bank-info-cell-text')}>{_value || ''}</span>
                        : <span className={cx('bank-info-cell-text-no-value')}>{_title}</span>
                    }
                    {!haveCopy && <div className={cx('copy-text')} onClick={onCopy}>{Languages.transferBank.copy}</div>}
                </div>
            </>
        );
    }, []);

    const renderItemRightBankInfo = useCallback((_title: string, _value?: string) => {
        return (
            <div className={cx('bank-field-container')}>
                <span className={cx('bank-field-label')}>{_title}</span>
                {_value
                    ? <span className={cx('bank-field-value')}>{_value}</span>
                    : <span className={cx('bank-field-value-no-value')}>{_title}</span>}
            </div>
        );
    }, []);

    const renderLeftView = useMemo(() => {
        return (
            <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                <div className={cx('content-container')}>
                    <span className={cx('receiver-describe-transfer-text')}>{Languages.transferBank.describeTransfer}</span>
                    <div className={cx('receiver-bank-name-container')}>
                        {renderBankInfoCell(Languages.transferBank.receiverBankName, bankInfo?.name_bank, true)}
                    </div>
                    <span className={cx('receiver-bank-owner-text')}>{Languages.transferBank.receiverBankOwner}</span>
                    <span className={cx('receiver-bank-owner-text-value')}>{bankInfo?.name_account}</span>
                    {renderBankInfoCell(Languages.transferBank.receiverBankNumber, bankInfo?.account)}
                    <span className={cx('receiver-transfer-amount-text')}>{Languages.transferBank.transferAmount}</span>
                    <span className={cx('receiver-transfer-amount-text-value')}>{utils.formatLoanMoney(bankInfo?.money)}</span>
                    {renderBankInfoCell(Languages.transferBank.transferContent, bankInfo?.description)}
                    <div className={cx('transfer-note-container')}>
                        <img src={IcWarning} />
                        <span className={cx('transfer-note-text')}>{Languages.transferBank.noteTransfer}</span>
                    </div>
                </div>
            </Col>
        );
    }, [bankInfo?.account, bankInfo?.description, bankInfo?.money, bankInfo?.name_account, bankInfo?.name_bank, renderBankInfoCell]);

    const renderRightView = useMemo(() => {
        return (
            <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                <div className={cx('qr-code-container')}>
                    <span className={cx('qr-action-text')}>{Languages.transferBank.qrAction}</span>
                    <div className={cx('qr-code-img-container')}>
                        {qrUrl
                            ? <img src={qrUrl} className={cx('img-qr')} />
                            : <Loading />
                        }
                        <span className={cx('bank-owner')}>{bankInfo?.name_account}</span>
                        {renderItemRightBankInfo(Languages.transferBank.bank, bankInfo?.name_bank)}
                        {renderItemRightBankInfo(Languages.transferBank.bankNumber, bankInfo?.account)}
                        <a className={cx('download')} href={qrUrl} download={`tienngay-qr-code-transfer-${dateUtils.getCurrentTime()}`}>
                            <img src={IcDownload} />
                        </a>
                    </div>
                </div>
            </Col>
        );
    }, [bankInfo?.account, bankInfo?.name_account, bankInfo?.name_bank, qrUrl, renderItemRightBankInfo]);

    const handleInvestMore = useCallback(() => {
        EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.INVESTMENT, TABS_INVEST.INVESTMENT);
    }, []);

    const handleSeeList = useCallback(() => {
        onSuccessInvestPackage?.();
    }, [onSuccessInvestPackage]);

    const onTransfer = useCallback(() => {
        refSuccessInvest.current?.showModal();
    }, []);

    const renderViewTransfer = useMemo(() => {
        return (
            <div className={cx('modal-open-popup')} >
                <span className={cx('text-black h5 medium center text-center y20')}>{Languages.invest.loadingTransaction}</span>
                <Spinner className={cx('spinner')} />
                <span className={cx('text-gray h6 center y15 b15 text-center')}>{Languages.invest.noteInvestSuccess}</span>
                <div className={cx('button-container')}>
                    <Button
                        label={Languages.invest.transferSuccess}
                        labelStyles={cx('text-white h7 medium')}
                        containButtonStyles={cx('btn-container')}
                        isLowerCase
                        rightIcon={IcSave}
                        onPress={onTransfer}
                    />
                    <Button
                        label={Languages.invest.notTransfer}
                        labelStyles={cx('text-red h7 medium')}
                        containButtonStyles={cx('btn-cancel')}
                        isLowerCase
                        rightIcon={IcCancel}
                        onPress={goBack}
                    />
                </div>
            </div>
        );
    }, [goBack, onTransfer]);

    return (
        <div className={cx('page-container')}>
            <div className={cx('all-content')}>
                <div className={cx(isMobile ? 'ic-back-mobile' : 'ic-back')} onClick={goBack}>
                    <img src={IcLeftArrow} />
                </div>
                <Row gutter={[24, 24]} className={cx('row-content')}>
                    {renderLeftView}
                    {renderRightView}
                </Row>
                {renderViewTransfer}
                <Footer />
            </div>
            <PopupBaseCenterScreen
                ref={refSuccessInvest}
                title={Languages.invest.investSuccess}
                description={Languages.invest.noteInvestSuccess}
                textTitleStyle={cx('label-popup-style')}
                imgStyle={cx('img-style')}
                labelSuccess={Languages.invest.seeListInvesting}
                labelCancel={Languages.invest.investMore}
                hasTwoButton
                onClose={handleInvestMore}
                onSuccessPress={handleSeeList}
                width={isMobile ? '100%' : '60%'}
                icon={IcSuccess} />
            <PopupBaseCenterScreen
                ref={refMaintain}
                description={message}
                imgStyle={cx('img-maintain-style')}
                hasCloseIc
                width={isMobile ? '100%' : '50%'}
                textDescribeStyle={cx('describe-popup-style')}
                icon={IcMaintain} />
        </div>
    );
});

export default TransferBank;
