import IcPortrait from 'assets/image/ic_gray_portrait.svg';
import IcFront from 'assets/image/ic_gray_front.svg';
import IcBehind from 'assets/image/ic_gray_behind.svg';
import IcRefresh from 'assets/image/ic_black_refresh.svg';
import IcTicked from 'assets/image/ic_white_ticked.svg';
import { Image, Col, Row } from 'antd';
import IcWarning from 'assets/image/ic_yellow_warning.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './info-identity.module.scss';
import { UserInfoModel } from 'models/user-model';
import { TextFieldActions } from 'components/input/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { MyTextInput } from 'components/input';
import { COLOR_TRANSACTION, DescribePhoto, STATE_VERIFY_ACC } from 'commons/constants';
import SelectPhoto, { SelectPhotoAction } from 'components/select-photo';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { observer } from 'mobx-react';
import { useAppStore } from 'hooks';
import toasty from 'utils/toasty';
import formValidate from 'utils/form-validate';

const cx = classNames.bind(styles);

type PostData = {
    identity: string;
    frontCard: string;
    behindCard: string;
    portrait: string;
}

const InfoIdentity = observer(() => {
    const isMobile = useIsMobile();
    const { userManager, apiServices } = useAppStore();
    const [visible, setVisible] = useState<boolean>(false);
    const [positionImage, setPositionImage] = useState<number>(0);
    const [heightElement, setHeightElement] = useState<number>(0);

    const [postData, setPostData] = useState<PostData>({
        identity: '',
        frontCard: '',
        behindCard: '',
        portrait: ''
    });

    const refIdentity = useRef<TextFieldActions>(null);
    const refFrontCard = useRef<SelectPhotoAction>(null);
    const refBehindCard = useRef<SelectPhotoAction>(null);
    const refPortrait = useRef<SelectPhotoAction>(null);
    const elementRef = useRef<any>(null);

    useEffect(() => {
        setHeightElement(elementRef?.current?.clientHeight);
        getInfo();
    }, []);

    const getInfo = useCallback(async () => {
        const resInfoAcc = await apiServices.auth.getUserInfo() as any;
        if (resInfoAcc.success) {
            userManager.updateUserInfo({ ...resInfoAcc.data });
            setPostData(last => {
                last.identity = resInfoAcc?.data?.identity;
                last.behindCard = resInfoAcc?.data?.card_back;
                last.frontCard = resInfoAcc?.data?.front_facing_card;
                last.portrait = resInfoAcc?.data?.avatar;
                return last;
            });
        }
    }, [apiServices.auth, userManager]);

    const renderDescribePhoto = useCallback((title: string, describeArray?: string[]) => {
        return (
            <div className={cx('describe-photo-container')}>
                <span className={cx('describe-photo-title')}>{title}</span>
                {describeArray?.map((item: string, index: number) => {
                    return (
                        <span className={cx('describe-photo-text')} key={index}>{item}</span>
                    );
                })}
            </div>
        );
    }, []);

    const renderInput = useCallback((_ref: any, value: string, disabled: boolean) => {
        const onChange = (text: string) => {
            setPostData(last => {
                last.identity = text;
                return last;
            });
        };
        return (
            <MyTextInput
                ref={_ref}
                value={value}
                type={'number'}
                label={Languages.identity.identity}
                containerStyle={cx('input')}
                onChangeText={onChange}
                maxLength={12}
                placeHolder={Languages.identity.inputIdentity}
                disabled={disabled}
            />
        );
    }, []);

    const renderPhoto = useCallback((_title: string, icon: any, imgCache: string, positionAlbums: number, _ref: any) => {
        const openDialogFiles = () => {
            _ref?.current?.show?.();
        };
        const openPreview = () => {
            setVisible(true);
            setPositionImage(positionAlbums);
        };

        return (
            <div className={cx('photo-container')} style={_title === Languages.identity.portrait ? { height: `${heightElement}px`, display: 'flex', flexDirection: 'column' } : {}}>
                <span className={cx('photo-title')}>{_title}</span>
                {imgCache
                    ? <Image
                        preview={{ visible: false, mask: <>{Languages.identity.showFull}</> }}
                        src={imgCache}
                        onClick={openPreview}
                        rootClassName={cx(_title === Languages.identity.portrait ? 'photo-portrait-image' : 'photo-image')}
                    />
                    : <img src={icon} className={cx(_title === Languages.identity.portrait ? 'photo-portrait' : 'photo')} onClick={openDialogFiles} />
                }
            </div>
        );
    }, [heightElement]);

    const renderDialogPreviewImageGroup = useCallback(() => {
        const onChangePreview = (viewable: boolean) => {
            setVisible(viewable);
        };
        return (
            <div className={cx('image-group')}>
                <Image.PreviewGroup preview={{ visible, onVisibleChange: onChangePreview, current: positionImage }}>
                    <Image src={userManager.userInfo?.front_facing_card || postData?.frontCard} />
                    <Image src={userManager.userInfo?.card_back || postData?.behindCard} />
                    <Image src={userManager.userInfo?.avatar || postData?.portrait} />
                </Image.PreviewGroup>
            </div>
        );
    }, [positionImage, postData?.behindCard, postData?.frontCard, postData?.portrait, userManager.userInfo?.avatar, userManager.userInfo?.card_back, userManager.userInfo?.front_facing_card, visible]);

    const getPath = useCallback(async (file: any, refPhoto: any) => {
        const res = await apiServices?.common.uploadImage(file);
        if (res.success) {
            const data = res?.data;
            switch (refPhoto) {
                case refFrontCard:
                    return setPostData?.({ ...postData, frontCard: `${data}` });
                case refBehindCard:
                    return setPostData?.({ ...postData, behindCard: `${data}` });
                case refPortrait:
                    return setPostData?.({ ...postData, portrait: `${data}` });
                default:
                    return;
            }
        } else {
            toasty.error(Languages.errorMsg.uploadingError);
        }
    }, [apiServices?.common, postData]);

    const renderSelectPhoto = useCallback((_ref: any) => {
        const onChange = (e: any) => {
            getPath(e.target.files[0], _ref);
        };
        return (
            <SelectPhoto ref={_ref} onChangeText={onChange} />
        );
    }, [getPath]);

    const onReChoose = useCallback(() => {
        setPostData({ ...postData, frontCard: '', behindCard: '', portrait: '' });
    }, [postData]);

    const onValidate = useCallback(() => {
        const errMsgIdentify = formValidate.cardValidate(postData.identity);
        refIdentity.current?.setErrorMsg(errMsgIdentify);

        if (`${errMsgIdentify}`.length === 0) {
            return true;
        } return false;
    }, [postData.identity]);

    const onEKyc = useCallback(async () => {
        if (onValidate()) {
            if (postData.frontCard && postData.behindCard && postData.portrait) {
                const res = await apiServices?.auth?.identityVerify(
                    postData.identity,
                    postData.frontCard,
                    postData.behindCard,
                    postData.portrait
                ) as any;
                if (res.success) {
                    toasty.success(res.message);
                    const resUser = await apiServices.auth.getUserInfo() as any;
                    if (resUser.success) {
                        const data = resUser.data as UserInfoModel;
                        userManager.updateUserInfo({
                            ...userManager.userInfo,
                            ...data,
                            identity: postData.identity,
                            avatar: postData.frontCard,
                            front_facing_card: postData.behindCard,
                            card_back: postData.portrait
                        });
                    }
                }
            }
            else {
                toasty.error(Languages.errorMsg.errEmptyPhoto);
            }
        } else {
            toasty.error(Languages.errorMsg.errEmptyIdentity);
        }
    }, [apiServices.auth, onValidate, postData.behindCard, postData.frontCard, postData.identity, postData.portrait, userManager]);

    const renderButton = useCallback((_title: string, _buttonStyle: any, _rightIcon: any, _onPress: () => void) => {
        return (
            <Button label={_title} width={isMobile ? 35 : 30} buttonStyle={_buttonStyle} isLowerCase rightIcon={_rightIcon} onPress={_onPress} />
        );
    }, [isMobile]);

    return (
        <div className={cx('all-container')}>
            <span className={cx('title-page')}>{Languages.identity.title}</span>
            {userManager.userInfo?.tinh_trang?.color === COLOR_TRANSACTION.RED && <>
                <img src={IcWarning} className={cx('warning')} />
                <span className={cx('describe-identity-text')}>{Languages.identity.describeIdentity}</span>
            </>}

            {renderInput(refIdentity, userManager.userInfo?.identity || postData?.identity, !!userManager.userInfo?.identity)}
            <Row gutter={[24, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    {renderDescribePhoto(Languages.identity.photoKyc, DescribePhoto.noteKYC)}
                    <div className={cx('kyc-container')} ref={elementRef}>
                        {renderPhoto(Languages.identity.frontKyc, IcFront, userManager.userInfo?.front_facing_card || postData.frontCard, 0, refFrontCard)}
                        {renderPhoto(Languages.identity.behindKyc, IcBehind, userManager.userInfo?.card_back || postData.behindCard, 1, refBehindCard)}
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    {renderDescribePhoto(Languages.identity.photoPortrait, DescribePhoto.notePortrait)}
                    {renderPhoto(Languages.identity.portrait, IcPortrait, userManager.userInfo?.avatar || postData.portrait, 2, refPortrait)}
                </Col>
            </Row>
            {userManager.userInfo?.tinh_trang?.status === STATE_VERIFY_ACC.NO_VERIFIED &&
                <div className={cx('button-container')}>
                    {renderButton(Languages.identity.reChoose, BUTTON_STYLES.GRAY, IcRefresh, onReChoose)}
                    {renderButton(Languages.identity.verify, BUTTON_STYLES.GREEN, IcTicked, onEKyc)}
                </div>}
            {renderSelectPhoto(refFrontCard)}
            {renderSelectPhoto(refBehindCard)}
            {renderSelectPhoto(refPortrait)}
            {renderDialogPreviewImageGroup()}
        </div>
    );
});

export default InfoIdentity;
