import React from 'react';
import { Pagination } from 'antd';

import './index.scss';

export const PaginationComponent = (props: any) => {
    return (
        <Pagination
            showQuickJumper
            pageSizeOptions={['5', '8', '10', '25', '50']}
            {...props}
        />
    );
};
