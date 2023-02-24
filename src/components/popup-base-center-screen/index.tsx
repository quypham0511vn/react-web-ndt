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
import styles from './popup-base-center-screen.module.scss';

const cx = classNames.bind(styles);

const PopupBaseCenterScreen = forwardRef<PopupBaseActions, PopupBaseProps>(
    ({ onSuccessPress, onClose, onBackdropPress,
        description,
        icon,
        title,
        labelSuccess,
        labelCancel,
        hasTwoButton,
        hasOneButton,
        textDescribeStyle,
        buttonContainerStyle,
        textTitleStyle,
        iconLeft,
        iconRight,
        customerContent,
        hasCloseIc,
        buttonLeftStyle,
        buttonRightStyle,
        notCenter,
        width,
        imgStyle
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
            setVisible(false);
        }, [onClose]);

        const onRight = useCallback(() => {
            setVisible(false);
            onSuccessPress?.();
        }, [onSuccessPress]);

        const renderCustomModal = useCallback(() => {

            return (
                <div className={cx('container')}>

                    {hasCloseIc && <img src={Ic_Close} className={cx('icon-close')} onClick={onBackDrop} />}

                    {icon && <img src={icon} className={imgStyle || cx('icon-main')} />}

                    {title && <span className={textTitleStyle ? textTitleStyle : cx('text-title')}>{title}</span>}

                    {description && <span className={textDescribeStyle ? textDescribeStyle : cx('text-describe')}>{description}</span>}

                    {customerContent}

                    {hasTwoButton && <div className={cx(buttonContainerStyle ? buttonContainerStyle : 'two-button-container')}>
                        <Button
                            label={labelCancel}
                            isLowerCase
                            onPress={onLeft}
                            rightIcon={iconLeft}
                            width={49}
                            buttonStyle={buttonLeftStyle || BUTTON_STYLES.OUTLINE_GREEN}
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
                            width={100}
                            buttonStyle={buttonRightStyle || BUTTON_STYLES.GREEN}
                        />
                    </div>}
                </div>
            );
        }, [buttonContainerStyle, buttonLeftStyle, buttonRightStyle, customerContent, description, hasCloseIc, hasOneButton, hasTwoButton, icon, iconLeft, iconRight, labelCancel, labelSuccess, onBackDrop, onLeft, onRight, textDescribeStyle, textTitleStyle, title]);

        return (
            <Modal
                open={visible}
                footer={null}
                modalRender={renderCustomModal}
                style={{ pointerEvents: 'auto' }}
                width={width}
                className={notCenter ? cx('not-center-modal') : undefined}
                centered={notCenter}
            />
        );
    }
);

export default PopupBaseCenterScreen;
