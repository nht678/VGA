
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ConsultantLevelView from 'src/sections/consultantlevel/view/consultantlevel-view';

export default function ConsultantLevelPage() {
    return (
        <>
            <Helmet>
                <title> Consultant Level </title>
            </Helmet>

            <ConsultantLevelView />
        </>
    );
}
