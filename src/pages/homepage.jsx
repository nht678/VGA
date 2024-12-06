import { Helmet } from 'react-helmet-async';
import Header from "src/pages/header";
import HomepageView from "src/sections/homepage/homepage-view";
import Footer from "../sections/footer/footer";

export default function Homepage() {
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <Header />

      <HomepageView />
      <Footer />

    </>
  );
}
