import { Helmet } from 'react-helmet-async';
import Header from "./header";
import NewsView from "../sections/News/news-view";
import Footer from "../sections/footer/footer";

export default function NewsPage() {
    return (
        <>
            <Helmet>
                <title>Tin tức</title>
            </Helmet>
            <Header />
            <NewsView />
            <Footer />
        </>
    );
}