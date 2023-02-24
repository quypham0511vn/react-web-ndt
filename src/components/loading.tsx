import { Skeleton } from 'antd';
import React from 'react';

export const Loading = ({ className }: { className?: string }) => {
    return <Skeleton title paragraph={{ rows: 1 }} active />;
};

