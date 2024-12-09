import React from "react";
import { Helmet } from "react-helmet-async";

import HistoryBookingOfConsultantView from "src/sections/historybookingofConsultant/view/historybookingofConsultant-view";

export default function HistoryBookingOfConsultantPage() {
    return (
        <>
            <Helmet>
                <title>Lịch sử đặt lịch</title>
            </Helmet>

            <HistoryBookingOfConsultantView />
        </>
    );
}