import { Helmet } from 'react-helmet-async';

import WithdrawalRequestView from 'src/sections/withdrawalrequest/view/withdrawal-request-view';


export default function WithdrawalRequest() {
    return (
        <>
            <Helmet>
                <title> Withdrawal Request </title>
            </Helmet>

            <WithdrawalRequestView />
        </>
    );
}
