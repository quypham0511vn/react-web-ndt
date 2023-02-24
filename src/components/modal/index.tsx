import { PopupBaseProps, PopupBaseActions } from 'components/modal/modal';
import { forwardRef, useImperativeHandle, useState } from 'react';

const Popup = forwardRef<PopupBaseActions, PopupBaseProps>(({ title, description, onSuccessPress }: PopupBaseProps, ref) => {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const hideModal = () => {
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true);
    };

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal
    }));

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        onSuccessPress?.();
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        null
        // <Modal
        //     title={title}
        //     visible={visible}
        //     onOk={handleOk}
        //     confirmLoading={confirmLoading}
        //     onCancel={handleCancel}
        //     cancelText={Languages.common.cancel}
        //     okText={Languages.common.continue}
        //     focusTriggerAfterClose={true}
        //     maskClosable={true}
        //     centered={false}
        //     closable={true}
        // >
        //     <p>{description}</p>
        // </Modal>
    );
});

export default Popup;
