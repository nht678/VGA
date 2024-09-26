import Header from "src/pages/header";
import HomepageView from "src/sections/homepage/homepage-view";
import Footer from "../sections/footer/footer";

export default function Homepage() {
  return (
    <>
      {/* <Helmet>
        <title> Homepage | Minimal UI </title>
      </Helmet> */}
      <Header />

      <HomepageView />
      <Footer />

    </>
  );
}
