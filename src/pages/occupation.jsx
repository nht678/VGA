import React from "react";
import { Helmet } from "react-helmet-async";
import OccupationView from "src/sections/occupation/view/occupation-view";

export default function OccupationPage() {
    return (
        <>
            <Helmet>
                <title>Nghề nghiệp</title>
            </Helmet>

            <OccupationView />
        </>
    );
}