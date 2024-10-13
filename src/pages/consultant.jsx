

import React from 'react';
import { Helmet } from 'react-helmet-async';
import ConsultantView from 'src/sections/consultant/view/consultant-view';

export default function Consultant() {
    return ( // Thêm return ở đây
        <>
            <Helmet>
                <title>Consultants</title>
            </Helmet>
            <ConsultantView />
        </>
    );
}
