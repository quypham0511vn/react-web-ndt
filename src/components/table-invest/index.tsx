import classNames from 'classnames/bind';
import { COLOR_TRANSACTION } from 'commons/constants';
import Languages from 'commons/languages';
import Spinner from 'components/spinner';
import { Total } from 'models/commission';
import React, { useCallback } from 'react';
import { COLORS } from 'theme/colors';
import utils from 'utils/utils';
import style from './table-invest.module.scss';
import ImgNoData from 'assets/image/img_no_data.png';

const cx = classNames.bind(style);

const TableInvest = (
    { dataTableInvest,
        arrKey,
        columnName,
        dataFooter,
        isLoading,
        description
    }:
        {
            dataTableInvest: any,
            arrKey: Array<string>,
            columnName: string[],
            dataFooter?: Total,
            isLoading?: boolean,
            description?: string
        }) => {
    const renderTableRowValueInvest = useCallback((_arrayRow: any, _arrayColumn: Array<string>, _arrKey: Array<string>) => {
        return (
            <>
                <thead>
                    <tr>
                        {_arrayColumn?.map?.((item: string, index: number) => { return (<td className={cx('text-black h7 medium')} key={index}>{item}</td>); })}
                    </tr>
                </thead>
                <tbody className={'body-table'}>
                    {_arrayRow?.map?.((item: any, index: number) => {
                        const renderItem = (key: string, _indexItem: number) => {
                            if (key === 'hinh_thuc') {
                                return <td key={_indexItem} className={cx('h7')}
                                    style={{ color: item['color'] === COLOR_TRANSACTION.GREEN ? COLORS.GREEN_2 : item['color'] }}>
                                    {item['hinh_thuc']}</td>;
                            } else if (key === 'ma_hop_dong') {
                                return <td key={_indexItem} className={cx('h7 text-center text-blue')}>{item['ma_hop_dong']}</td>;
                            } else if (key === 'trang_thai') {
                                return <td
                                    key={_indexItem}
                                    className={cx('h7')}
                                    style={{ color: item['color'] === COLOR_TRANSACTION.GREEN ? COLORS.GREEN_2 : item['color'] }}
                                >
                                    {item['trang_thai']}</td>;
                            } else {
                                return <td className={cx('text-gray h7')} key={_indexItem}>
                                    {(`${item[key]}`.trim().charAt(Number([item[key].length - 1])) === 'D' ||
                                        `${item[key]}`.trim().charAt(Number([item[key].length - 1])) === 'đ')
                                        ? item[key]
                                            .replace(' VND', '')
                                            .replace(' đ', '')
                                            .replace('+', '')
                                            .replace('-', '')
                                            .replaceAll('.', ',')
                                        : item[key]
                                            .replace('+', '')
                                            .replace('-', '')
                                            .replaceAll('.', ',')}
                                </td>;
                            }
                        };

                        return (
                            <tr key={index} className={cx((index + 1) % 2 === 0 ? 'row-even' : 'row-odd')}>
                                {_arrayColumn[0] === 'STT' && <td>{index + 1}</td>}
                                {_arrKey?.map((keyItem: string, _index: number) => {
                                    if (Object.keys(item).some((key => key === keyItem))) {
                                        return renderItem(keyItem, _index);
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </>
        );
    }, []);

    const renderTableRowFooter = useCallback((_arrayRow: Total) => {
        return (
            <tbody >
                <tr className={cx('style-table-footer')}>
                    <td colSpan={2}>{Languages.commission.total}</td>
                    <td>{utils.formatMoneyToCommaAndNotSuffixes(_arrayRow?.total_money_number || 0)}</td>
                    <td>{utils.formatMoneyToCommaAndNotSuffixes(_arrayRow?.money_commission_number || 0)}</td>
                </tr>
            </tbody>
        );
    }, []);

    return (
        <table className={cx('table-invest')}>
            {dataTableInvest?.length > 0
                ? <>
                    {renderTableRowValueInvest(dataTableInvest, columnName, arrKey)}
                    {dataFooter && renderTableRowFooter(dataFooter as Total)}
                </>

                : (
                    <tbody>
                        {isLoading
                            ? <tr>
                                <td><Spinner className={cx('spinner')} /></td>
                            </tr>
                            : <tr>
                                <td className={cx('container')}>
                                    <img src={ImgNoData} className={cx('image')} />
                                    <span className={cx('h6 text-black')}>{description}</span>
                                </td>
                            </tr>}
                    </tbody>
                )
            }
        </table>
    );
};

export default TableInvest;

