import classNames from 'classnames/bind';
import { PackageInvest } from 'models/invest';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import styles from './tabs-history.module.scss';

const cx = classNames.bind(styles);
export interface TabsItemManage {
    id?: string;
    renderComponent?: ReactNode;
    title?: string;
}

function HistoryTabs({ dataTabs, defaultTabs, isMobile }:
    {
        dataTabs?: TabsItemManage[], defaultTabs?: string, isMobile?: boolean
    }
) {
    const [tabsName, setTabsName] = useState<string>(defaultTabs || '0');

    const renderView = useMemo(() => {
        return (
            <>
                {dataTabs?.map((item: TabsItemManage, index: number) => {
                    return <div key={index}>
                        {
                            tabsName === `${index}` && item?.renderComponent
                        }
                    </div>;
                })}
            </>
        );
    }, [dataTabs, tabsName]);

    const renderTabsView = useCallback(() => {
        return (
            <div className={cx('all-tabs-component')}>
                <div className={cx(isMobile ? 'tabs-component-mobile' : 'tabs-component')}>
                    <div className={cx(isMobile ? 'tabs-container-mobile' : 'tabs-container')} >
                        {dataTabs?.map((item: TabsItemManage, index: number) => {
                            const onChange = () => {
                                setTabsName(`${index}`);
                            };
                            return <span key={index} className={cx(tabsName === `${index}` ? 'tabs-text-active' : 'tabs-text')} onClick={onChange}>{item?.title}</span>;
                        })}
                    </div>
                </div>
                {renderView}
            </div>
        );
    }, [dataTabs, isMobile, renderView, tabsName]);

    return renderTabsView();
}

export default HistoryTabs;
