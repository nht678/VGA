import React from "react";
import { Helmet } from "react-helmet-async";
import EntryLevelEducationView from "src/sections/entryLevelEducation/view/entryLevelEducation-view";

export default function EntryLevelEducationPage() {
    return (
        <>
            <Helmet>
                <title>Trình độ đào tạo</title>
            </Helmet>

            <EntryLevelEducationView />
        </>
    );
}
