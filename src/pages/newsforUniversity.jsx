import React from "react";
import { Helmet } from "react-helmet-async";
import NewsForUniversityView from "src/sections/newsforuniversity/view/newsforuniversity-view";

export default function NewsForUniversity() {
    return (
        <>
            <Helmet>
                <title>Tin tức</title>
            </Helmet>
            <NewsForUniversityView />
        </>
    );
}
