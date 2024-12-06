import { Helmet } from 'react-helmet-async';

import WalletView from 'src/sections/wallet/wallet-view';


export default function Wallet() {
    return (
        <>
            <Helmet>
                <title>Ví</title>
            </Helmet>

            <WalletView />
        </>
    );
}