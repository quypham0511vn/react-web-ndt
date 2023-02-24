import classNames from 'classnames/bind';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import styles from './select-photo.module.scss';

type SelectPhotoProps = {
    onChangeText?: (content?: any) => void,
};

export type SelectPhotoAction = {
    getValue?: () => void,
    setValue?: (text?: string) => void,
    show?: () => void,
};

const cx = classNames.bind(styles);

const SelectPhoto = forwardRef<SelectPhotoAction, SelectPhotoProps>(({
    onChangeText
}: SelectPhotoProps, ref: any) => {

    const orgTextInput = useRef<HTMLInputElement>(null);

    const [imageUrl, setImageUrl] = useState<string>('');

    useImperativeHandle(ref, () => ({
        getValue,
        setValue,
        show
    }));

    const getValue = useCallback(() => {
        return imageUrl;
    }, [imageUrl]);

    const setValue = useCallback((text: any) => {
        if (text) {
            setImageUrl?.(text);
        } else {
            setImageUrl?.('');
        }
    }, []);

    const show = useCallback(() => {
        orgTextInput.current?.click();
    }, []);

    const onChange = useCallback((e?: any) => {
        onChangeText?.(e);
    }, [onChangeText]);

    return <input
        type={'file'}
        ref={orgTextInput}
        onChange={onChange}
        style={{ display: 'none' }}
        accept={'image/png, image/jpeg, image/jpg'}
        size={60}
        multiple={false}
        onClick={(e: any) => (e.target.value = null)}
    />;
});

export default SelectPhoto;
