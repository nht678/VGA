import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from 'src/pages/header';

import ProfileUniversityView from 'src/sections/profile/profileuniversity-view';
import Footer from 'src/sections/footer/footer';

export default function ProfileUniversityPage() {
    return (
        <>
            <Helmet>
                <title> Hồ sơ của bạn</title>
            </Helmet>
            <Header />
            <ProfileUniversityView />
            <Footer />
        </>
    );
}