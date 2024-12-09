import { Helmet } from 'react-helmet-async';
import React from 'react';
import ReportView from 'src/sections/report/view/report-view';

export default function Report() {
    return (
        <>
            <Helmet>
                <title>Báo cáo</title>
            </Helmet>
            <ReportView />
        </>
    );
}