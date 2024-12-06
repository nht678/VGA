import { Helmet } from 'react-helmet-async';
import React from 'react';
import TransactionAdminView from 'src/sections/transactionAdmin/view/transactionAdmin-view';

export default function TransactionAdmin() {
    return (
        <>
            <Helmet>
                <title>Giao dịch</title>
            </Helmet>
            <TransactionAdminView />
        </>
    );
}
