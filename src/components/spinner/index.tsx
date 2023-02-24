import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import { COLORS } from 'theme/colors';

export default function Spinner({ color = COLORS.GREEN, className }:
    {
        color?: string,
        className?: string,
    }
) {

    const antIcon = <LoadingOutlined style={{ fontSize: 25, color }} spin />;

    return <Spin indicator={antIcon} className={className}/>;
}
