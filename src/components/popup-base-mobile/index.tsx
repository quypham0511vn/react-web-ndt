import { Modal } from 'antd';
import Ic_Close from 'assets/image/ic_black_close_popup.svg';
import classNames from 'classnames/bind';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { PopupBaseActions, PopupBaseProps } from 'components/modal/modal';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState
} from 'react';
import styles from './popup-base-mobile.module.scss';

const cx = classNames.bind(styles);

const PopupBaseMobile = forwardRef<PopupBaseActions, PopupBaseProps>(
    ({ onSuccessPress, onClose, onBackdropPress,
        description, icon, title, labelSuccess,
        labelCancel, hasTwoButton, hasOneButton,
        textDescribeStyle, buttonContainerStyle,
        textTitleStyle, iconLeft, iconRight,
        customerContent, hasCloseIc, titleHeader, iconHeader, buttonLeftStyle, buttonRightStyle
    }: PopupBaseProps, ref) => {
        const [visible, setVisible] = useState(false);

        const hideModal = useCallback(() => {
            setVisible(false);
        }, []);

        const showModal = useCallback(() => {
            setVisible(true);
        }, []);

        useImperativeHandle(ref, () => ({
            showModal,
            hideModal
        }));

        const onBackDrop = useCallback(() => {
            setVisible(false);
            onBackdropPress?.();
        }, [onBackdropPress]);

        const onLeft = useCallback(() => {
            onClose?.();
        }, [onClose]);

        const onRight = useCallback(() => {
            setVisible(false);
            onSuccessPress?.();
        }, [onSuccessPress]);

        const renderCustomModal = useCallback(() => {

            return (
                <div className={cx('container')}>
                    <div className={cx('header-container')}>
                        {iconHeader && <img src={iconHeader} />}
                        {titleHeader && <span className={cx('title-header-text')}>{titleHeader}</span>}
                        {hasCloseIc && <img src={Ic_Close} className={cx('icon-close')} onClick={onBackDrop} />}
                    </div>
                    {icon && <img src={icon} className={cx('icon-main')} />}

                    {title && <span className={textTitleStyle ? textTitleStyle : cx('text-title')}>{title}</span>}

                    {description && <span className={textDescribeStyle ? textDescribeStyle : cx('text-describe')}>{description}</span>}

                    <div className={cx('custom-container')}>
                        {customerContent}
                        {hasTwoButton && <div className={cx(buttonContainerStyle ? buttonContainerStyle : 'two-button-container')}>
                            <Button
                                label={labelCancel}
                                isLowerCase
                                onPress={onLeft}
                                rightIcon={iconLeft}
                                width={49}
                                buttonStyle={buttonLeftStyle || BUTTON_STYLES.OUTLINE_GREEN}
                                labelStyles={cx('label-button-style')}
                            />
                            <Button
                                label={labelSuccess}
                                isLowerCase
                                onPress={onRight}
                                rightIcon={iconRight}
                                width={49}
                                buttonStyle={buttonRightStyle || BUTTON_STYLES.GREEN}
                            />
                        </div>}

                        {hasOneButton && <div className={buttonContainerStyle ? buttonContainerStyle : cx('one-button-container')} >
                            <Button
                                label={labelSuccess}
                                isLowerCase
                                onPress={onRight}
                                rightIcon={iconRight}
                                width={45}
                                buttonStyle={buttonRightStyle || BUTTON_STYLES.GREEN}
                            />
                        </div>}
                    </div>
                </div>
            );
        }, [iconHeader, titleHeader, hasCloseIc, onBackDrop, icon, title, textTitleStyle, description, textDescribeStyle, customerContent, hasTwoButton, buttonContainerStyle, labelSuccess, onLeft, iconLeft, buttonLeftStyle, labelCancel, onRight, iconRight, buttonRightStyle, hasOneButton]);

        return (
            <Modal
                open={visible}
                footer={null}
                modalRender={renderCustomModal}
                style={{ pointerEvents: 'auto' }}
            />
        );
    }
);

export default PopupBaseMobile;
