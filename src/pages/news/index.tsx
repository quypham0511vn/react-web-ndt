import IcClock from 'assets/image/ic_clock.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import Footer from 'components/footer';
import LazyImage from 'components/image';
import { NewsComponent } from 'components/news-component';
import { NewsExtraComponent } from 'components/news-component-extra';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { NewsModel } from 'models/news';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dateUtils from 'utils/date-utils';
import styles from './news.module.scss';

const cx = classNames.bind(styles);
const SPLIT_NEWS = 5;
const IMG_TAG = 'display: block; width: 100%;';

function News() {
    const { apiServices } = useAppStore();
    const [news, setNews] = useState<NewsModel[]>([]);
    const [focusedNews, setFocusedNews] = useState<NewsModel>();

    const isMobile = useIsMobile();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = useCallback(async () => {
        const api = await apiServices.common.getNews() as any;
        if (api.success) {
            const data = api?.data as NewsModel[];
            setNews(data);
            if (data.length > 0) {
                setFocusedNews(data[1]);
            }
        }
    }, [apiServices.common]);

    const renderTimeDate = useCallback(() => {
        return (
            <div className={cx('column')}>
                <span className={cx('text-green medium h4')}>{focusedNews?.title_vi}</span>
                <div className={cx('row y10')}>
                    <img src={IcClock} className={cx('pr5')} />
                    <span className={cx('text-gray h7 pl5')}>{dateUtils.getDateFormat(focusedNews?.created_at)}</span>
                </div>
            </div>
        );
    }, [focusedNews?.created_at, focusedNews?.title_vi]);

    const renderContent = useMemo(() => {
        return (
            <div className={cx('column flex y15', 'content-view')}>
                <LazyImage src={focusedNews?.image} className={cx('y10')} width={'100%'} />
                <div className={cx('text-gray h7 bold y10')}
                    dangerouslySetInnerHTML={{ __html: focusedNews?.content_vi.replace(IMG_TAG, '') || '' }} />

            </div>
        );
    }, [focusedNews]);

    const onNewsClick = useCallback((item: NewsModel) => {
        setFocusedNews(item);
        document.getElementsByClassName(cx('page'))[0].scrollTo({ behavior: 'smooth', top: 0 });
    }, []);

    const renderHotNews = useMemo(() => {
        return (
            <div className={cx('column')}>
                <span className={cx('text-black bold h6 b20')}>{Languages.news.new.toUpperCase()}</span>
                <NewsComponent
                    dataLink={news.slice(0, SPLIT_NEWS)}
                    styleContainer={isMobile ? cx('row', 'scroll-y') : undefined}
                    styleRow={isMobile ? cx('row x10', 'style', 'shadow') : cx('shadow', 'item-new')}
                    onClick={onNewsClick}
                    styleImg={cx('style-img')}
                />
            </div>
        );
    }, [isMobile, news, onNewsClick]);

    const renderOtherNews = useMemo(() => {
        return (
            <div className={cx('column')}>
                <span className={cx('text-green medium h6')}>{Languages.news.other.toUpperCase()}</span>
                <NewsExtraComponent
                    dataLink={news.slice(SPLIT_NEWS)}
                    isMobile={isMobile}
                    onClick={onNewsClick}
                    styleContainer={cx('row')}
                />
            </div>
        );
    }, [isMobile, news, onNewsClick]);

    return (
        <div className={cx('page')}>
            <div className={cx('page-content', 'padding')}>
                {isMobile ?
                    <div className={cx('column')}>
                        {renderHotNews}
                        <div className={cx('padding-top')}>{renderTimeDate()}</div>
                        {renderContent}
                    </div> :
                    <>
                        <div className={cx('container-left')}>
                            {renderTimeDate()}
                            {renderContent}
                        </div>
                        <div className={cx('container-right')}>
                            {renderHotNews}
                        </div>
                    </>}
            </div>
            <div className={cx('padding')}>
                {renderOtherNews}
            </div>
            <Footer />
        </div>
    );
}

export default News;
