

import React from 'react';
import { Helmet } from 'react-helmet-async';
import ConsultantView from 'src/sections/consultant/view/consultant-view';

export default function Consultant() {
    return ( // Thêm return ở đây
        <>
            <Helmet>
                <title>Tư vấn viên</title>
            </Helmet>
            <ConsultantView />
        </>
    );
}
