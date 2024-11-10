import React from "react";
import { Helmet } from "react-helmet-async";
import AdmissionMethodView from "src/sections/admissionMethod/view/admissionMethod-view";

export default function AdmissionMethodPage() {
    return (
        <>
            <Helmet>
                <title>Phương thức tuyển sinh</title>
            </Helmet>

            <AdmissionMethodView />
        </>
    );
}