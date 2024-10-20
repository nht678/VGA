import { Helmet } from 'react-helmet-async';
import React from 'react';
import TransactionView from 'src/sections/transaction/view/transaction-view';

export default function Transaction() {
    return (
        <>
            <Helmet>
                <title>Transaction</title>
            </Helmet>
            <TransactionView />
        </>
    );
}