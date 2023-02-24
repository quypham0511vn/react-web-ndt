import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback } from 'react';
import styles from './history-package.module.scss';
import IcWarning from 'assets/image/ic_yellow_small_warning.svg';
import IcChecked from 'assets/image/ic_red_small_checked.svg';
import { PackageInvest } from 'models/invest';
import utils from 'utils/utils';

const cx = classNames.bind(styles);

function HistoryPackage({ dataInvest, onPressPackage, isInvesting }:
    {
        dataInvest?: PackageInvest, onPressPackage?: (data?: PackageInvest) => any, isInvesting?: boolean
    }
) {
    const handlePressPackage = useCallback(() => {
        onPressPackage?.(dataInvest);
    }, [dataInvest, onPressPackage]);

    const renderKeyValue = useCallback((_label: string, _value?: string) => {
        return (
            <div className={cx('invest-key-value-container')}>
                <div className={cx('left-item-container')}>
                    <img src={IcChecked} />
                    <span className={cx('label-item')}>{_label}</span>
                </div>
                <span className={cx('value-item')}>{_value}</span>
            </div>
        );
    }, []);

    return (
        <div className={cx('all-container')} onClick={handlePressPackage}>
            <span className={cx('invest-amount-text')}>{utils.formatLoanMoney(dataInvest?.so_tien_dau_tu)}</span>
            <div className={cx('invest-pay-form-container')}>
                <span className={cx('invest-pay-form-text')}>{`${Languages.invest.interestPayForm}${dataInvest?.hinh_thuc_tra_lai}`}</span>
                {/* <img src={IcWarning} /> */}
            </div>
            {renderKeyValue(Languages.invest.interestYear, dataInvest?.ti_le_lai_suat_hang_nam)}
            {renderKeyValue(Languages.invest.dateInvest, dataInvest?.thoi_gian_dau_tu)}
            {isInvesting && renderKeyValue(Languages.invest.expectedProfit, utils.formatLoanMoney(dataInvest?.tong_lai_du_kien))}
            {renderKeyValue(Languages.history.interestReceived, utils.formatLoanMoney(dataInvest?.tong_lai_da_tra))}
            {isInvesting && renderKeyValue(Languages.history.remainingOriginal, utils.formatLoanMoney(dataInvest?.tong_goc_con_lai))}
            {renderKeyValue(Languages.history.dateInvest, dataInvest?.ngay_dau_tu)}
            {renderKeyValue(
                isInvesting ? Languages.history.expectedDueDate : Languages.history.expectedDate,
                dataInvest?.ngay_dao_han
            )}
        </div>
    );
}

export default HistoryPackage;
