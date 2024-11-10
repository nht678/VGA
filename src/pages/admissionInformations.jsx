import React from "react";
import { Helmet } from "react-helmet-async";
import AdmissionInformationsView from "src/sections/admissionInformations/view/admissionInformations-view";

export default function AdmissionInformationsPage() {
    return (
        <>
            <Helmet>
                <title>Thông tin tuyển sinh</title>
            </Helmet>

            <AdmissionInformationsView />
        </>
    );
}