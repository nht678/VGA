import React from "react";
import { Helmet } from "react-helmet-async";
import MajorCategoryView from "src/sections/majorCategory/view/majorCategory-view";

export default function MajorCategoryPage() {
    return (
        <>
            <Helmet>
                <title>Ngành học</title>
            </Helmet>

            <MajorCategoryView />
        </>
    );
}