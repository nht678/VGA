import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";

import {
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaSkype,
  FaPaperPlane,
} from "react-icons/fa";
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

import logo from "../../../public/assets/images/avatars/Logo.png";
import img1 from "../../../public/assets/images/avatars/avatar_24.jpg";
import img2 from "../../../public/assets/images/avatars/avatar_23.jpg";
import img3 from "../../../public/assets/images/avatars/avatar_22.jpg";
// import img4 from "../../../public/assets/images/avatars/avatar_21.jpg";


// import "./style.css";

const Footer = () => {
  const { t } = useTranslation();

  const onClick = (e) => {
    e.preventDefault();
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    // <footer className="gauto-footer-area">
    //   <div className="footer-top-area">
    //     <Container>
    //       <Row>
    //         <Col lg={4}>
    //           <div className="single-footer">
    //             <div className="footer-logo">
    //               <Link to="/">
    //                 <img style={{ width: 50, height: 50 }} src={logo} alt="footer-logo" />
    //               </Link>
    //             </div>
    //             <p>
    //               Empowering students and schools with seamless university connections and personalized career guidance
    //             </p>
    //             <div className="footer-address">
    //               <h3>Head Office</h3>
    //               <p>
    //                 125 Big fella St. Road, <span>New York, Hi 5654775</span>
    //               </p>
    //               <ul>
    //                 <li>Phone: 326487652 </li>
    //                 <li>Email:thanhnhat@gmail.com</li>
    //                 <li>Office Time: 9AM- 4PM</li>
    //               </ul>
    //             </div>
    //           </div>
    //         </Col>
    //         <Col lg={4}>
    //           <div className="single-footer quick_links">
    //             <h3>{t("quick_links")}</h3>
    //             <ul className="quick-links">
    //               <li>
    //                 <Link to="/" onClick={onClick}>
    //                   {" "}
    //                   About Us
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" onClick={onClick}>
    //                   Our Service
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" onClick={onClick}>
    //                   Case Studies
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" onClick={onClick}>
    //                   Contact Us
    //                 </Link>
    //               </li>
    //             </ul>
    //             <ul className="quick-links">
    //               <li>
    //                 <Link to="/" onClick={onClick}>
    //                   Privacy
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" onClick={onClick}>
    //                   Latest News
    //                 </Link>
    //               </li>
    //             </ul>
    //           </div>
    //           <div className="single-footer newsletter_box">
    //             <h3>{t("footer.newsletter")}</h3>
    //             <form onSubmit={SubmitHandler}>
    //               <input type="email" placeholder="Email Address" />
    //               <button type="submit">
    //                 <FaPaperPlane />
    //               </button>
    //             </form>
    //           </div>
    //         </Col>
    //         <Col lg={4}>
    //           <div className="single-footer">
    //             <h3>Recent Post</h3>
    //             <ul>
    //               <li>
    //                 <div className="single-footer-post">
    //                   <div className="footer-post-image">
    //                     <Link to="/blog-single">
    //                       <img src={img1} alt="footer post" />
    //                     </Link>
    //                   </div>
    //                   <div className="footer-post-text">
    //                     <h3>
    //                       <Link to="/blog-single">
    //                         Revealed: How to set goals for you and your team
    //                       </Link>
    //                     </h3>
    //                     <p>Posted on: Jan 12, 2019</p>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="single-footer-post">
    //                   <div className="footer-post-image">
    //                     <Link to="/blog-single">
    //                       <img src={img2} alt="footer post" />
    //                     </Link>
    //                   </div>
    //                   <div className="footer-post-text">
    //                     <h3>
    //                       <Link to="/blog-single">
    //                         Revealed: How to set goals for you and your team
    //                       </Link>
    //                     </h3>
    //                     <p>Posted on: Jan 12, 2019</p>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li>
    //                 <div className="single-footer-post">
    //                   <div className="footer-post-image">
    //                     <Link to="/blog-single">
    //                       <img src={img3} alt="footer post" />
    //                     </Link>
    //                   </div>
    //                   <div className="footer-post-text">
    //                     <h3>
    //                       <Link to="/blog-single">
    //                         apartment in the sky love three boys of his own.
    //                       </Link>
    //                     </h3>
    //                     <p>Posted on: Jan 12, 2019</p>
    //                   </div>
    //                 </div>
    //               </li>
    //             </ul>
    //           </div>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </div>
    //   <div className="footer-bottom-area">
    //     <Container>
    //       <Row>
    //         <Col md={6}>
    //           <div className="copyright">
    //             <p>
    //               Design With <FaHeart /> from{" "}
    //               <Link to="/" onClick={onClick}>
    //                 Themescare
    //               </Link>
    //             </p>
    //           </div>
    //         </Col>
    //         <Col md={6}>
    //           <div className="footer-social">
    //             <ul>
    //               <li>
    //                 <Link to="/" onClick={onClick}>
    //                   <FaFacebookF />
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" onClick={onClick}>
    //                   <FaTwitter />
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" onClick={onClick}>
    //                   <FaLinkedinIn />
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/" onClick={onClick}>
    //                   <FaSkype />
    //                 </Link>
    //               </li>
    //             </ul>
    //           </div>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </div>
    // </footer>
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our newsletter.</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Stay updated with the latest news and exclusive insights by subscribing to our newsletter, where you’ll receive carefully curated content directly to your inbox.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Each week, we deliver a selection of insightful articles covering the latest trends and developments to keep you informed and engaged.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <dt className="mt-4 font-semibold text-white">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Please avoid sending multiple unnecessary messages in a short period. Let’s keep the conversation efficient and respectful for everyone.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
};

export default Footer;
