import React from "react";
import { Helmet } from "react-helmet-async";
import MajorView from "src/sections/major/view/major-view";

export default function MajorPage() {
    return (
        <>
            <Helmet>
                <title>Ngành học</title>
            </Helmet>

            <MajorView />
        </>
    );
}