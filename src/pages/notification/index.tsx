import classNames from 'classnames/bind';
import { PAGE_SIZE_INVEST } from 'commons/configs';
import { NOTIFY_STATE } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import Footer from 'components/footer';
import NoData from 'components/no-data';
import ScrollTopComponent from 'components/scroll-top';
import TabsButtonBar from 'components/tabs-button-bar';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { observer } from 'mobx-react';
import { Notify } from 'models/invest';
import { NotificationTotalModel } from 'models/notification';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import dateUtils from 'utils/date-utils';
import styles from './notification.module.scss';

const cx = classNames.bind(styles);
const IMG_TAG = 'display: block; width: 100%;';

interface KeyValueModel {
    text?: string;
    value?: number;
    id?: string;
}

const Notification = observer(({ keyTabs }: { keyTabs: number }) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices, userManager, common } = useAppStore();

    const [tabIndex, setTabIndex] = useState<number>(keyTabs);

    const [dataNotificationList, setDataNotificationList] = useState<Notify[]>([]);

    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);

    const [categories, setCategories] = useState<KeyValueModel[]>([]);

    useEffect(() => {
        getUnreadNotify();
        getCategories();
    }, []);

    useEffect(() => {
        getNotify();
    }, [tabIndex]);

    const handleScrollToTop = () => {
        document.getElementsByClassName(cx('header-container'))[0].scrollTo({ behavior: 'smooth', top: 0 });
    };

    const onChangeTab = useCallback((_tabIndex: number) => {
        if (tabIndex !== _tabIndex) {
            setTabIndex(_tabIndex);
            handleScrollToTop();
            setOffset(0);
        }
    }, [tabIndex]);

    const getUnreadNotify = useCallback(async () => {
        if (userManager.userInfo) {
            const res = await apiServices.notification?.getUnreadNotify() as any;
            if (res.success) {
                const data = res.data as NotificationTotalModel;
                common.setAppConfig({ ...common.appConfig, total_un_read: data?.total_unRead });
            }
        }
    }, [apiServices.notification, common, userManager.userInfo]);

    const getCategories = useCallback(async () => {
        const resCate = await apiServices.notification.getNotificationCategories() as any;
        if (resCate.success && resCate.data) {
            setCategories(Object.keys(resCate.data).map((key: string, index: number) => {
                const cate = {
                    id: key,
                    text: resCate.data[key],
                    value: index
                };
                return cate;
            }));
        }
    }, [apiServices.notification]);

    const getNotify = useCallback(async (loadMore?: boolean) => {
        if (userManager.userInfo) {
            const res = await apiServices.notification?.getNotify(
                PAGE_SIZE_INVEST,
                loadMore ? offset : 0,
                tabIndex + 1
            ) as any;
            if (res.success) {
                const data = res.data as Notify[];
                setCanLoadMore(res?.data?.length === PAGE_SIZE_INVEST);
                setOffset(last => loadMore ? (last + PAGE_SIZE_INVEST) : PAGE_SIZE_INVEST);
                if (loadMore) {
                    setDataNotificationList(last => [...last, ...data]);
                } else {
                    setDataNotificationList(data);
                }
            }
        }
    }, [apiServices.notification, offset, tabIndex, userManager.userInfo]);

    const loadMoreNotify = useCallback(() => {
        getNotify(true);
    }, [getNotify]);

    const renderNotificationList = useMemo(() => {
        if (dataNotificationList.length === 0) {
            return <div className={cx('notify-container')}>
                <NoData description={Languages.notification.noData} />
            </div>;
        }
        return (
            <div className={cx('notify-container')}>
                {dataNotificationList?.map((item: Notify, index: number) => {
                    const enablePress = tabIndex === 1;

                    const onMarkRead = async () => {
                        if (!enablePress) {
                            return;
                        }
                        if (item?.status === NOTIFY_STATE.UN_READ) {
                            const res = await apiServices.invest.getNotifyUpdateRead(item?.id) as any;
                            if (res.success) {
                                setDataNotificationList(last => last.map((itemChild: Notify) => {
                                    if (item.id === itemChild.id) {
                                        itemChild.status = NOTIFY_STATE.READ;
                                    }
                                    return itemChild;
                                }));
                                getUnreadNotify();
                                if (item.link) {
                                    // navigate page of link 
                                }
                            }
                        }
                    };

                    const isUnRead = !enablePress || item?.status === NOTIFY_STATE.UN_READ;

                    const layout = <>
                        <span className={cx('title-item-notify')}>{item?.title}</span>
                        <span className={cx('text-date-item-notify')}>{dateUtils.formatDatePicker(item?.updated_at)}</span>
                        <div className={cx('item-notify-content-container')}>
                            {item?.image && <img src={item?.image} className={cx('image')} />}
                            <span
                                className={cx('text-describe-item-notify')}
                                dangerouslySetInnerHTML={{ __html: item?.message.replace(IMG_TAG, '') || '' }} />
                        </div>
                    </>;

                    if (enablePress) {
                        return <div
                            className={cx(isUnRead ? 'item-notify-un-container' : 'item-notify-read-container')}
                            key={`${item?.id}${index}`}
                            onClick={onMarkRead}
                        >
                            {layout}
                        </div>;
                    }

                    return (
                        <div
                            className={cx('item-notify-container')}
                            key={`${item?.id}${index}`}
                        >
                            {layout}
                        </div>
                    );
                })}
                {canLoadMore &&
                    <Button
                        buttonStyle={BUTTON_STYLES.GREEN}
                        fontSize={20}
                        width={isMobile ? 100 : 40}
                        labelStyles={cx('label-button-see-more')}
                        containButtonStyles={cx('button-see-more-container')}
                        label={Languages.notification.seeMore}
                        onPress={loadMoreNotify}
                        isLowerCase />
                }
            </div>
        );
    }, [apiServices.invest, canLoadMore, dataNotificationList, getUnreadNotify, isMobile, loadMoreNotify, tabIndex]);

    return (
        <div className={cx('page')}>
            <div className={cx('header-container')}>
                <TabsButtonBar
                    dataTabs={categories}
                    isMobile={isMobile}
                    notifyNumber={common.appConfig?.total_un_read}
                    onChangeText={onChangeTab}
                    defaultTabs={`${keyTabs}`} />
            </div>
            {renderNotificationList}
            <Footer />
            <ScrollTopComponent nameClassScroll={cx('header-container')} />
        </div>
    );
});

export default Notification;
