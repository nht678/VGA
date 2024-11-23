import React from "react";
import { Helmet } from "react-helmet-async";
import Payment from "../sections/payment/payment";

export default function PaymentPage() {
    return (
        <>
            <Helmet>
                <title>Thanh toán</title>
            </Helmet>
            <Payment />
        </>
    );
}
