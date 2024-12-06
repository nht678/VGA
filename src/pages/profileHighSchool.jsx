
import { Helmet } from 'react-helmet-async';
import React from 'react';
import Header from 'src/pages/header';
import ProfileHighSchoolView from 'src/sections/profile/profilehighschool-view';
import Footer from 'src/sections/footer/footer';

export default function ProfileHighSchoolPage() {
    return (
        <>
            <Helmet>
                <title> Hồ sơ của bạn</title>
            </Helmet>
            <Header />
            <ProfileHighSchoolView />
            <Footer />
        </>
    );
}   