
import React from 'react';
import { Helmet } from 'react-helmet-async';

import NewsUniversityView from 'src/sections/newsuniversity/newsuniversity-view';

export default function NewsUniversity() {
    return (
        <>
            <Helmet>
                <title> News University | Minimal UI </title>
            </Helmet>
            <NewsUniversityView />
        </>
    );
}