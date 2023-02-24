import { Col, Row } from 'antd';
import ImgAppStore from 'assets/image/img_app_store.svg';
import ImgCircle from 'assets/image/img_circle.jpeg';
import ImgGGPLay from 'assets/image/img_gg_chplay.svg';
import ImgHalf from 'assets/image/img_half_phone.jpg';
import ImgHeader from 'assets/image/img_home_header.jpg';
import ImgPerson from 'assets/image/img_person.jpeg';
import ImgPhone from 'assets/image/img_phone1.jpg';
import ImgPhone1 from 'assets/image/img_phone2.jpeg';
import ImgPhone2 from 'assets/image/img_phone3.jpeg';
import ImgPosterVideo from 'assets/image/img_poster.jpeg';
import ImgQRCode from 'assets/image/img_qr.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import Footer from 'components/footer';
import InvestItem from 'components/invest-item';
import { Loading } from 'components/loading';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { observer } from 'mobx-react';
import { ItemProps } from 'models/common';
// import { DashBroadModel } from 'models/dash';
import { ServiceModel } from 'models/intro';
import { PackageInvest } from 'models/invest';
import { serviceList, videoIntro } from 'assets/static-data/intro';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import utils from 'utils/utils';
import styles from './intro.module.scss';
import { EventEmitter } from 'utils/event-emitter';
import { Events, TABS_INVEST, TAB_INDEX } from 'commons/constants';
import YouTubeFrame from 'components/youtube-frame';
import NoData from 'components/no-data';
import Spinner from 'components/spinner';

const cx = classNames.bind(styles);

const Intro = observer(() => {
    const [step, setStep] = useState<number>(1);
    const { apiServices } = useAppStore();
    const isMobile = useIsMobile();
    // const [run, setRun] = useState<boolean>(false);
    const [topIntroHeight, setTopIntroHeight] = useState<number>(0);
    const [topVideoHeight, setTopVideoHeight] = useState<number>(0);
    const [widText, setWidText] = useState<number>(0);
    const [circleWid, setCircleWid] = useState<number>(0);
    const [dataMoney, setDataMoney] = useState<ItemProps[]>([]);
    const [dataTime, setDataTime] = useState<ItemProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isNotLoadMore, setIsNotLoadMore] = useState<boolean>(false);

    const [dataArr, setDataArr] = useState<PackageInvest[]>([]);
    // const [dataDash, setDataDash] = useState<DashBroadModel>();
    const pickerTypeInterestRef = useRef<PickerAction>(null);

    const PAGE_SIZE = 9;
    const condition = useRef({
        isLoading: true,
        offset: 0,
        canLoadMore: true,
        timeInvestment: '',
        moneyInvest: '',
        typeInterest: ''
    });

    const [dataTypeInterest, setDataTypeInterest] = useState<ItemProps[]>([]);
    const pickerAmountRef = useRef<PickerAction>(null);
    const pickerDateRef = useRef<PickerAction>(null);
    const elementRef = useRef<any>(null);
    const videoRef = useRef<any>(null);
    const circleRef = useRef<any>(null);
    const textRef = useRef<any>(null);


    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Rerender view on browser resize with React
    useEffect(() => {
        setTopIntroHeight(elementRef?.current?.clientHeight);
        setTopVideoHeight(videoRef?.current?.clientHeight);
        setCircleWid(circleRef?.current?.clientWidth);
        setWidText(textRef?.current?.clientWidth);
    }, [size]);

    useEffect(() => {
        fetchDataInvest();
        fetchDataMoney();
        fetchDataTypeInterest();
        fetchDataTimeInvestment();
    }, []);

    // useEffect(() => {
    //     if (userManager.userInfo) {
    //         fetchContractsDash();
    //     }
    // }, [userManager.userInfo]);

    // useEffect(() => {
    //     const scrollHandler = () => {
    //         const count = document.getElementById(cx('inner-center')) as HTMLElement;
    //         const end = count?.getBoundingClientRect();
    //         if (end.bottom < window.innerHeight && end.bottom > 0) {
    //             setRun(true);
    //         }
    //     };
    //     window.addEventListener('scroll', scrollHandler, true);
    //     return () => {
    //         window.removeEventListener('scroll', scrollHandler, true);
    //     };
    // }, []);

    const fetchDataMoney = useCallback(async () => {
        const res = await apiServices.invest.getListMoneyInvestment() as any;
        if (res.success) {
            const data = utils.formatObjectFilterInvest(res.data as ItemProps[]);
            setDataMoney(data);
        }
    }, [apiServices.invest]);

    const fetchDataTypeInterest = useCallback(async () => {
        const res = await apiServices.invest.getListTypeInterest() as any;
        if (res.success) {
            const data = utils.formatObjectFilterInvest(res.data as ItemProps[]);
            setDataTypeInterest(data);
        }
    }, [apiServices.invest]);


    const fetchDataTimeInvestment = useCallback(async () => {
        const res = await apiServices.invest.getListTimeInvestment() as any;
        if (res.success) {
            const data = utils.formatObjectFilterInvest(res.data as ItemProps[]);
            setDataTime(data);
        }
    }, [apiServices.invest]);

    // const fetchContractsDash = useCallback(async () => {
    //     setIsLoading(true);
    //     const resContractsDash = await apiServices.common.getContractsDash() as any;
    //     setIsLoading(false);
    //     if (resContractsDash.success) {
    //         const data = resContractsDash?.data as DashBroadModel;
    //         setDataDash(data);
    //     }
    // }, [apiServices.common]);

    const fetchDataInvest = useCallback(async () => {
        setIsLoading(true);
        if (condition.current.isLoading) {
            const resInvest = await apiServices.invest.getAllContractInvest(
                condition.current.typeInterest,
                condition.current.timeInvestment,
                condition.current.moneyInvest,
                condition.current.offset,
                PAGE_SIZE
            ) as any;
            setIsLoading(false);
            if (resInvest.success) {
                const data = resInvest?.data as PackageInvest[];
                const dataSize = data.length;
                if (dataSize > 0) {
                    if (condition.current.offset === 0) {
                        setDataArr(data);
                    } else {
                        setDataArr((list) => [...list || [], ...data]);
                    }
                    if (dataSize < PAGE_SIZE) {
                        setIsNotLoadMore(true);
                    }
                }
            }
        }
        condition.current.isLoading = false;
        setIsLoading(false);
    }, [apiServices.invest]);

    const linkInvestPackage = useCallback(() => {
        EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.INVESTMENT);
    }, []);

    const renderText = useCallback((string: string) => {
        const newString = string.split('/n');
        return newString.map((item, index) => (<span className={cx('text-green medium h3')} key={index}>{item}</span>));
    }, []);

    const renderViewTop = useMemo(() => {
        console.log(widText);
        return (
            <Row className={cx('view-body', 'padding-not-bottom')} gutter={[24, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('jus-start')}>
                    <div className={cx('view-body-right')} ref={textRef}>
                        {widText < (isMobile ? 352 : 475) ? renderText(Languages.intro.advantagesDownLineTienngay) : <span className={cx('text-green medium h3')} >{Languages.intro.advantagesTienngay}</span>}
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.riskReduction}</span>
                            <span className={cx('text-black h6')}>{Languages.intro.riskReductionContent}</span>
                        </div>
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.ecosystemNextTech}</span>
                            <span className={cx('text-black h6')}>{Languages.intro.ecosystemNextTechContent}</span>
                        </div>
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.appInvest}</span>
                            <span className={cx('text-black h6')}>{Languages.intro.appInvestContent}</span>
                        </div>
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.flexibleTime}</span>
                            <span className={cx('text-black h6')}>{Languages.intro.flexibleTimeContent}</span>
                        </div>
                        <div className={cx('center')}>
                            <Button
                                label={Languages.intro.seeInvest}
                                containButtonStyles={cx('button-style', 'y20')}
                                labelStyles={cx('text-white medium h6')}
                                isLowerCase
                                onPress={linkInvestPackage}
                            />
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={24} lg={24} xl={12} className={cx('jus-content')}>
                    <img src={ImgPerson} width={'100%'} className={cx('img')} />
                </Col>
            </Row>
        );
    }, [isMobile, linkInvestPackage, renderText, widText]);

    const onSelectItemTime = useCallback((item: any) => {
        condition.current.timeInvestment = item;
        condition.current.isLoading = true;
        condition.current.offset = 0;
        fetchDataInvest();
    }, [fetchDataInvest]);


    const onSelectItemMoney = useCallback((item: any) => {
        condition.current.moneyInvest = item;
        condition.current.isLoading = true;
        condition.current.offset = 0;
        fetchDataInvest();
    }, [fetchDataInvest]);


    const onSelectTypeInterest = useCallback((item: any) => {
        condition.current.typeInterest = item;
        condition.current.isLoading = true;
        condition.current.offset = 0;
        fetchDataInvest();
    }, [fetchDataInvest]);

    const renderPicker = useCallback((_ref: any, _title: string, _placeholder: string, _data: ItemProps[], onSelectItem: any) => {

        return (
            <Col className={cx('picker-container')} xs={24} sm={24} md={24} lg={24} xl={8} >
                <PickerComponent ref={_ref} data={_data} title={_title} placeholder={_placeholder} onSelectItem={onSelectItem} />
            </Col>
        );
    }, []);

    const renderItemInvest = useCallback((index: number, dataInvest: PackageInvest) => {
        const onNavigateInvestDetail = () => {
            EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.INVESTMENT, TABS_INVEST.INVEST_DETAIL, dataInvest);
        };

        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} className={cx('top-intro')} key={index}>
                <InvestItem onPressInvest={onNavigateInvestDetail} dataInvest={dataInvest} />
            </Col>
        );
    }, []);

    const onLoadMore = useCallback(() => {
        condition.current.offset += PAGE_SIZE;
        condition.current.isLoading = true;
        fetchDataInvest();
    }, [fetchDataInvest]);

    const renderViewInvest = useMemo(() => {
        return (
            <div id={cx('content-container')}>
                <span className={cx('text-green h3 medium')}>{Languages.intro.investAttractive}</span>
                <Row gutter={[24, 16]} className={cx('top-search-component')}>
                    {renderPicker(pickerTypeInterestRef, Languages.invest.typeInterest, Languages.invest.chooseTypeInterest, dataTypeInterest, onSelectTypeInterest)}
                    {renderPicker(pickerAmountRef, Languages.invest.investAmount, Languages.invest.investAmountChoose, dataMoney, onSelectItemMoney)}
                    {renderPicker(pickerDateRef, Languages.invest.dateInvest, Languages.invest.dateInvestChoose, dataTime, onSelectItemTime)}
                </Row>

                {dataArr.length > 0 ? <>
                    <Row gutter={isMobile ? [24, 36] : [24, 44]} className={cx('invest-list-component')}>
                        {dataArr?.map((itemInvest: PackageInvest, index: number) => {
                            return renderItemInvest(index, itemInvest);
                        })}
                    </Row>
                    {!isNotLoadMore && <div className={cx('center')}>
                        <Button
                            label={Languages.invest.moreInvest}
                            buttonStyle={BUTTON_STYLES.GREEN}
                            isLowerCase
                            containButtonStyles={'y30'}
                            labelStyles={cx('label-button-see-more')}
                            onPress={onLoadMore}
                            customStyles={{ paddingRight: 25, paddingLeft: 25, marginTop: 50 }}
                        />
                    </div>}
                </> : <>
                    {isLoading ? <Spinner className={cx('spinner')} />
                        : <NoData description={Languages.intro.noInvestHot} />}
                </>}

            </div>
        );
    }, [dataArr, dataMoney, dataTime, dataTypeInterest, isLoading, isMobile, isNotLoadMore, onLoadMore, onSelectItemMoney, onSelectItemTime, onSelectTypeInterest, renderItemInvest, renderPicker]);

    const steps = useCallback((index: number, content: string) => {

        const onChangeSteps = () => {
            setStep(index);
        };

        return (
            <div className={cx('column center y20', 'hv', 'invest-list-component')}>
                <div className={step === index ? cx('circle', 'border-green') : cx('circle', 'border-gray')} onClick={onChangeSteps}>
                    <span className={step === index ? cx('text-green h6 text-center', 'txt-white') : cx('text-gray h6 text-center', 'txt-white')}>{`${index}`}</span>
                </div>

                <span className={step === index ? cx('text-green h6 y10 text-center', 'txt-green') : cx('text-gray h6 y10 text-center', 'txt-green')}>{content}</span>
                {step === index && <div className={cx('line')} />}
            </div>
        );
    }, [step]);

    const stepsMobile = useCallback((index: number) => {

        const onChangeSteps = () => {
            setStep(index);
            document.getElementById('fade');
        };

        return (
            <div className={cx('column y20 center', 'flex')}>
                <div className={step === index ? cx('circle-small', 'border-green') : cx('circle-small', 'border-gray')} onClick={onChangeSteps}>
                    <span className={step === index ? cx('text-green h6 text-center', 'txt-white') : cx('text-gray h6 text-center', 'txt-white')}>{`${index}`}</span>
                </div>
            </div>
        );
    }, [step]);

    const getTopHeight = useCallback(() => {
        const screenHeight = window.innerHeight;
        return isMobile ? 0.45 * screenHeight : 0.45 * screenHeight;
    }, [isMobile]);

    const renderTopBackground = useMemo(() => {
        return {
            backgroundImage: `url(${ImgHeader})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: getTopHeight(),
            display: 'flex'
        };
    }, [getTopHeight]);

    const renderViewQrCode = useMemo(() => {
        return (
            <div className={cx('row y20 center')} style={{ maxWidth: '500px' }} >
                <div className={cx('column x30 space-between', 'wid-50', 'flex-end')}>
                    <img src={ImgAppStore} width={isMobile ? '90%' : '70%'} />
                    <img src={ImgGGPLay} width={isMobile ? '90%' : '70%'} className={cx('mrg-10')} />
                </div>
                <div className={cx('wid-50')}>
                    <img src={ImgQRCode} width={isMobile ? '90%' : '70%'} />
                </div>
            </div>
        );
    }, [isMobile]);

    const stepOne = useMemo(() => {

        return (
            <div className={cx('column center')} style={{ margin: '0% 10% 0% 5%' }}>
                <ul>
                    <li className={cx('text-black h6 light-hight-x5')}>{Languages.intro.registerApp}</li>
                    <li className={cx('text-black h6 y10 light-hight-x5')}>{Languages.intro.registerPhone}</li>
                    <li className={cx('text-black h6 y10 light-hight-x5')}>{Languages.intro.register1Minute}</li>
                </ul>
                {renderViewQrCode}
            </div>
        );
    }, [renderViewQrCode]);

    const stepTwo = useMemo(() => {
        return (
            <ul>
                <li className={cx('text-black h6 light-hight-x5')}>{Languages.intro.contentInvest1}</li>
                <li className={cx('text-black h6 y10 light-hight-x5')}>{Languages.intro.contentInvest2}</li>
                <li className={cx('text-black h6 y10 light-hight-x5')}>{Languages.intro.contentInvest3}</li>
            </ul>
        );
    }, []);

    const stepThree = useMemo(() => {
        return (
            <ul >
                <li className={cx('text-black h6 light-hight-x5')}>{Languages.intro.contentProfit1}</li>
                <li className={cx('text-black h6 y10 light-hight-x5')}>{Languages.intro.contentProfit2}</li>
                <li className={cx('text-black h6 y10 light-hight-x5')}>{Languages.intro.contentProfit3}</li>
            </ul>
        );
    }, []);

    const renderContentStep = useCallback((index: number) => {
        switch (index) {
            case 1:
                return stepOne;
            case 2:
                return stepTwo;
            default:
                return stepThree;
        }
    }, [stepOne, stepThree, stepTwo]);

    const renderImagePhone = useMemo(() => {
        switch (step) {
            case 1:
                return <img src={ImgPhone} style={{ maxHeight: '500px', maxWidth: '250px' }} width={isMobile ? '100%' : undefined} />;
            case 2:
                return <img src={ImgPhone1} style={{ maxHeight: '500px', maxWidth: '250px' }} width={isMobile ? '100%' : undefined} />;
            default:
                return <img src={ImgPhone2} style={{ maxHeight: '500px', maxWidth: '250px' }} width={isMobile ? '100%' : undefined} />;

        }
    }, [isMobile, step]);

    const renderGroupStepWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('row y20')}>
                <Col xs={24} sm={24} md={12} lg={12} xl={5} className={'row center'} style={{ maxHeight: '500px' }}>
                    <div className={cx('column', 'width-100', 'height-100')}  >
                        {steps(1, Languages.intro.step1)}
                        {steps(2, Languages.intro.step2)}
                        {steps(3, Languages.intro.step3)}
                    </div>
                    <div className={cx('line-right')} style={{ height: circleWid, maxHeight: '500px' }} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={6} className={cx('center')} >
                    {renderImagePhone}
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={13} className={cx('center')}>
                    <div
                        style={{
                            backgroundImage: `url(${ImgCircle})`,
                            width: '90%',
                            minHeight: '500px',
                            height: '100%',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            marginLeft: 10,
                            backgroundRepeat: 'no-repeat'

                        }}
                        className={cx('column center')}
                        id={cx('img')}
                        ref={circleRef}
                    >
                        <div className={cx('line-up')} >
                            {renderContentStep(step)}
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }, [circleWid, renderContentStep, renderImagePhone, step, steps]);

    const renderGroupStepMobile = useMemo(() => {
        return (
            <div className={cx('colum y20')}>
                <div className={cx('column', 'width-100')}>
                    <div className={cx('row', 'width-100')}>
                        {stepsMobile(1)}
                        {stepsMobile(2)}
                        {stepsMobile(3)}
                    </div>
                    <span className={cx('text-green h7 y10')}>{step === 1 ? Languages.intro.step1 : step === 2 ? Languages.intro.step2 : Languages.intro.step3}</span>
                </div>
                <div className={cx('center row y10')}>
                    <div className={cx('width-50')}>
                        {renderImagePhone}
                    </div>
                    <div className={cx('width-50', 'column')}>
                        {renderContentStep(step)}
                    </div>
                </div>
            </div>
        );
    }, [renderContentStep, renderImagePhone, step, stepsMobile]);

    const renderViewStepsInvest = useMemo(() => {
        return (
            <div className={cx('view-body column')}>
                <div className={cx('column', 'padding')}>
                    <span className={cx('text-green medium h3')}>{Languages.intro.stepsInvest}</span>
                    <span className={cx('text-black h6')}>{Languages.intro.stepContent}</span>
                    {isMobile ? renderGroupStepMobile : renderGroupStepWeb}
                </div>
                {/* not support */}
                {/* <div style={renderLeftBackground}>
                    <div id={cx('inner-center')}>
                        <div id={cx('text-content')}>
                            {infoInvest.map((item, index) => {
                                return (
                                    <div className={cx('column center', 'flex')} key={index}>
                                        <Count item={item} visible={run} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }, [isMobile, renderGroupStepMobile, renderGroupStepWeb]);

    const renderViewNearBelow = useMemo(() => {
        return (
            <div className={cx('view-body row')}>
                <div className={cx('column', 'padding')}>
                    <Row gutter={[24, 16]} className={cx('row y20')}>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className={cx('view-body-right')}>
                                <span className={cx('text-green medium h3')}>{Languages.intro.investmentReasons}</span>
                                <div className={cx('y10 column')}>
                                    <span className={cx('text-black medium h6')}>{Languages.intro.transparency}</span>
                                    <span className={cx('text-black h6')}>{Languages.intro.transparencyContent}</span>
                                </div>
                                <div className={cx('y10 column')}>
                                    <span className={cx('text-black medium h6')}>{Languages.intro.lasting}</span>
                                    <span className={cx('text-black h6')}>{Languages.intro.lastingContent}</span>
                                </div>
                                <div className={cx('y10 column')}>
                                    <span className={cx('text-black medium h6')}>{Languages.intro.easy}</span>
                                    <span className={cx('text-black h6')}>{Languages.intro.easyContent}</span>
                                </div>
                                <Button
                                    label={Languages.intro.seeInvest}
                                    containButtonStyles={cx('button-style', 'y20')}
                                    labelStyles={cx('text-white medium h6')}
                                    isLowerCase
                                    onPress={linkInvestPackage}
                                />
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12} className={cx('center column')}>
                            <YouTubeFrame videoLink={videoIntro.link} poster={ImgPosterVideo} />
                            <div
                                className={cx('column', 'title-vd')}
                                ref={videoRef}
                                style={{ marginTop: `${-topVideoHeight / 2}px` }}
                            >
                                <span className={cx('text-green h6 medium')}>{videoIntro.title}</span>
                                <span className={cx('text-gray h6')}>{videoIntro.content}</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div >
        );
    }, [linkInvestPackage, topVideoHeight]);

    const renderViewService = useMemo(() => {
        return (
            <div className={cx('service-container')}>
                <span className={cx('text-green medium h3')}>{Languages.intro.serviceHot}</span>

                <div className={cx('row y20', 'service')}>
                    <Marquee pauseOnHover gradient={false} speed={40}>
                        {serviceList.map((item: ServiceModel, index: number) => {
                            return (
                                <a key={index} className={cx('item-service', 'row center', 'padding-item')} href={item.link}>
                                    <img src={item.image} className={cx('image')} />
                                    <div className={cx('column xl10')}>
                                        <span className={cx('text-red h7 medium')}>{item.name}</span>
                                        <span className={cx('text-black h7')}>{item.content}</span>
                                    </div>
                                </a>
                            );
                        })}
                    </Marquee>
                </div>
            </div>
        );
    }, []);

    const renderBottom = useMemo(() => {
        return (
            <div className={cx('column', 'padding-bottom')}>
                <Row gutter={[24, 16]} className={cx('container')}>
                    <Col xs={24} md={24} lg={12} xl={12} >
                        <span className={cx('text-green medium h3')}>{Languages.intro.downloadApp}</span>
                        <div className={cx('column', 'center')}>
                            <span className={cx('text-black h5 y10')}>
                                {Languages.intro.appMobile[0]}
                                <span className={cx('text-green')}>{Languages.intro.appMobile[1]}</span>
                                {Languages.intro.appMobile[2]}
                            </span>

                            {renderViewQrCode}
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={12} xl={12} className={cx('center')}>
                        <img src={ImgHalf} className={cx('img-phone', 'center')} />
                    </Col>
                </Row>
            </div>
        );
    }, [renderViewQrCode]);

    return (
        <div className={cx('page')}>
            <div className={cx('flex')}>
                <div style={renderTopBackground}>
                    <div className={cx('view-title')}>
                        <span className={cx('animation-text-invest')}>{Languages.intro.invest}</span>
                        <span className={cx('animation-text-built')}>{Languages.intro.buildTheFuture}</span>
                        <span className={cx('animation-text-describe')}>{Languages.intro.contentResult}</span>
                    </div>
                </div>
            </div>
            <div
                className={cx('view-intro')}
                style={{ marginTop: `${-topIntroHeight / 2}px` }}
            >
                <div className={cx('view-intro-center', 'width-intro')}
                    ref={elementRef}>
                    <span className={cx('text-green h6', 'line-height')}>{Languages.intro.contentStart}</span>
                    <span className={cx('text-black h6', 'line-height')}>{Languages.intro.contentEnd}</span>
                </div>
            </div>
            {renderViewTop}
            {renderViewInvest}
            {renderViewStepsInvest}
            {renderViewNearBelow}
            {renderViewService}
            {renderBottom}
            {isLoading && <Loading />}
            <Footer />
        </div>
    );
});

export default Intro;
