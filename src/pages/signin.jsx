import { Helmet } from 'react-helmet-async';
import Header from './header';
import SigninView from '../sections/signin/signin-view';
import Footer from '../sections/footer/footer';

export default function Signin() {
    return (
        <>
            <Helmet>
                <title>Sign in | Minimal UI</title>
            </Helmet>
            <Header />
            <SigninView />
            <Footer />
        </>


    );
}
