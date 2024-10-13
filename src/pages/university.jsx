import { Helmet } from 'react-helmet-async';
import React from 'react';
import UniversityView from 'src/sections/university/view/university-view';

export default function University() {
    return (
        <>
            <Helmet>
                <title>University | Minimal UI</title>
            </Helmet>
            <UniversityView />
        </>
    );
}