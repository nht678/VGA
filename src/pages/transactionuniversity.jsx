import { Helmet } from 'react-helmet-async';
import React from 'react';
import TransactionUniversity from 'src/sections/transactionUniversity/view/transactionuniversity-view';

export default function TransactionUniversityPage() {
    return (
        <>
            <Helmet>
                <title>Giao dịch đại học</title>
            </Helmet>
            <TransactionUniversity />
        </>
    );
}
