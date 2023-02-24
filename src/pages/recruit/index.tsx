import classNames from 'classnames/bind';
import { Col, Row, Pagination, Carousel } from 'antd';
import Languages from 'commons/languages';
import Footer from 'components/footer';
import PickerComponent from 'components/picker-component/picker-component';
import { ItemProps } from 'models/common';
import React, { useCallback, useState } from 'react';
import styles from './recruit.module.scss';
import { MyTextInput } from 'components/input/index';
import { TYPE_INPUT } from 'commons/constants';
import TableInvest from 'components/table-invest';
import icon1 from 'assets/image/tuyendung_3_1.svg';
import icon2 from 'assets/image/tuyendung_3_2.svg';
import icon3 from 'assets/image/tuyendung_3_3.svg';
import img1 from 'assets/image/image_recruit.jpg';
import img2 from 'assets/image/image_recruit1.jpg';
import img3 from 'assets/image/image_recruit2.jpeg';
import img4 from 'assets/image/image_recruit3.jpg';
import img5 from 'assets/image/image_recruit4.jpg';
import imgBank from 'assets/image/bot.png';
import imgBank1 from 'assets/image/heyU.png';
import imgBank2 from 'assets/image/homedy.png';
import imgBank3 from 'assets/image/insurance.png';
import imgBank4 from 'assets/image/mic.png';
import imgBank5 from 'assets/image/momo.png';
import imgBank6 from 'assets/image/next100.png';
import imgBank7 from 'assets/image/vndt.png';
import imgBank8 from 'assets/image/vpbank.png';
import imgBank9 from 'assets/image/vps.png';
import { arrKeyRecruit, columnNameRecruit, dataRecruit, dateListAddress } from 'assets/static-data/invest';

const cx = classNames.bind(styles);

function Recruit() {
    const [jobPosition, setJobPosition] = useState<string>('');

    const renderSelect = useCallback((_data: ItemProps[], _title: string, _value?: string) => {
        return <PickerComponent data={_data} title={_title} value={_value} />;
    }, []);

    const renderInput = useCallback((_label: string, _type: string, _placeholder: string, _value: string, _ref?: any) => {
        return <MyTextInput label={_label} type={_type} value={_value} ref={_ref} placeHolder={_placeholder} />;
    }, []);

    const renderTable = useCallback((_dataTableInvest: any, _arrKey: Array<string>, _columnName: string[]) => {
        return <TableInvest dataTableInvest={_dataTableInvest} arrKey={_arrKey} columnName={_columnName} />;
    }, []);

    const renderItem = useCallback((_icon: any, _title: string, _describe: string) => {
        return <Col className={cx('divWidth', 'column center')} xs={24} sm={24} md={12} lg={12} xl={8}>
            <img src={_icon} width={'20%'} />
            <span className={cx('block medium y10 b10 h6')}>{_title}</span>
            <span className={cx('block h6')}>{_describe}</span>
        </Col>;
    }, []);

    const renderImage = useCallback((_image: any) => {
        return <>
            <img className={cx('image1 g-16')} src={_image} alt="" />
        </>;
    }, []);

    const renderSlide = useCallback((_image: any) => {
        return <>
            <img className={cx('imgSlide')} style={contentStyle} src={_image} alt="" />
        </>;
    }, []);

    // Carousel slide
    const contentStyle: React.CSSProperties = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center'
        // background: '#364d79'
    };

    return (
        <div className={cx('body')}>
            <div className={cx('width', 'column')}>
                <span className={cx('h3 b10 text-green medium block')}>{Languages.footer.informationChild[1]}</span>
                <span className={cx('h6 block')}>{Languages.recruit.recruitmentContent}</span>
                <span className={cx('h6 y40 b15 medium block')}>{Languages.recruit.desire}</span>
                <Row className={cx('row', 'left')} gutter={[24, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={cx('left')}>
                        {renderSelect(dateListAddress, Languages.recruit.textTime)}
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={'left'}>
                        {renderInput(Languages.recruit.jobPosition, TYPE_INPUT.TEXT, Languages.recruit.jobPosition, jobPosition)}
                    </Col>
                </Row>
                <div className={cx('table', 'center')}>
                    {renderTable(dataRecruit, arrKeyRecruit, columnNameRecruit)}
                </div>
                <Row className={cx('flex')} gutter={[24, 24]}>
                    {renderItem(icon1, Languages.recruit.promotion, Languages.recruit.textPromotion)}
                    {renderItem(icon2, Languages.recruit.peers, Languages.recruit.textPeers)}
                    {renderItem(icon3, Languages.recruit.opportunity, Languages.recruit.textOpportunity)}
                </Row>
                <span className={cx('h3 b40 text-green medium block')}>{Languages.recruit.discover}</span>
                <Row className={cx('img')} gutter={[24, 24]}>
                    <Col className={cx('flexImg', 'column')}>
                        {renderImage(img1)}
                        {renderImage(img2)}
                    </Col>
                    <Col className={cx('flexImg1', 'column')}>
                        <img className={cx('image')} src={img3} alt="" />
                    </Col>
                    <Col className={cx('flexImg', 'column')}>
                        {renderImage(img4)}
                        {renderImage(img5)}
                    </Col>
                </Row>
                <Carousel autoplay>
                    <div className={cx('flex')}>
                        {renderSlide(imgBank)}
                        {renderSlide(imgBank1)}
                        {renderSlide(imgBank2)}
                        {renderSlide(imgBank3)}
                        {renderSlide(imgBank4)}
                        {renderSlide(imgBank5)}
                        {renderSlide(imgBank6)}
                        {renderSlide(imgBank7)}
                        {renderSlide(imgBank8)}
                        {renderSlide(imgBank9)}
                    </div>
                    <div className={cx('flex')}>
                        {renderSlide(imgBank6)}
                        {renderSlide(imgBank9)}
                        {renderSlide(imgBank)}
                        {renderSlide(imgBank8)}
                        {renderSlide(imgBank7)}
                        {renderSlide(imgBank2)}
                        {renderSlide(imgBank3)}
                        {renderSlide(imgBank5)}
                        {renderSlide(imgBank1)}
                        {renderSlide(imgBank4)}
                    </div>
                </Carousel>
            </div>
            <Footer />
        </div>
    );
}

export default Recruit;
