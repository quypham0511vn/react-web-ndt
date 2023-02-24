import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback } from 'react';
import styles from './invest-item.module.scss';
import IcWarning from 'assets/image/ic_yellow_small_warning.svg';
import IcChecked from 'assets/image/ic_red_small_checked.svg';
import IcRightArrow from 'assets/image/ic_white_small_right_arrow.svg';
import { PackageInvest } from 'models/invest';
import utils from 'utils/utils';

const cx = classNames.bind(styles);

function InvestItem({ dataInvest, onPressInvest }:
    {
        dataInvest?: PackageInvest, onPressInvest?: (data?: PackageInvest) => any
    }
) {
    const handlePressInvest = useCallback(() => {
        onPressInvest?.(dataInvest);
    }, [dataInvest, onPressInvest]);

    const renderKeyValue = useCallback((_label: string, _value?: string) => {
        return (
            <div className={cx('invest-key-value-container')}>
                <div className={cx('label-container')}>
                    <img src={IcChecked} />
                    <span className={cx('label-item')}>{_label}</span>
                </div>
                <span className={cx('value-item')}>{_value}</span>
            </div>
        );
    }, []);

    return (
        <div className={cx('all-container')}>
            <span className={cx('invest-amount-text')}>{utils.formatLoanMoney(dataInvest?.so_tien_dau_tu || '0')}</span>
            <div className={cx('invest-pay-form-container')}>
                <span className={cx('invest-pay-form-text')}>{`${Languages.invest.interestPayForm}${dataInvest?.hinh_thuc_tra_lai}`}</span>
                {/* <img src={IcWarning} /> */}
            </div>
            {renderKeyValue(Languages.invest.interestYear, dataInvest?.ti_le_lai_suat_hang_nam)}
            {renderKeyValue(Languages.invest.dateInvest, dataInvest?.thoi_gian_dau_tu)}
            {renderKeyValue(Languages.invest.expectedProfit, utils.formatLoanMoney(dataInvest?.tong_lai_du_kien || '0'))}
            <div className={cx('invest-now-wrap')}>
                <div className={cx('invest-now-container')} onClick={handlePressInvest} >
                    <span className={cx('invest-now-text')}>{Languages.invest.discoveryNow}</span>
                    <img src={IcRightArrow} className={cx('ic_arrow')} />
                </div>
            </div>
        </div>
    );
}

export default InvestItem;
