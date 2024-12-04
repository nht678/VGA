import React from 'react';
import Header from 'src/pages/header';

import ProfileUniversityView from 'src/sections/profile/profileuniversity-view';
import Footer from 'src/sections/footer/footer';

export default function ProfileUniversityPage() {
    return (
        <>
            <Header />
            <ProfileUniversityView />
            <Footer />
        </>
    );
}