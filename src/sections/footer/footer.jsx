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

import logo from "../../../public/assets/images/avatars/Logo.png";
import img1 from "../../../public/assets/images/avatars/avatar_24.jpg";
import img2 from "../../../public/assets/images/avatars/avatar_23.jpg";
import img3 from "../../../public/assets/images/avatars/avatar_22.jpg";
// import img4 from "../../../public/assets/images/avatars/avatar_21.jpg";


import "./style.css";

const Footer = () => {
  const { t } = useTranslation();

  const onClick = (e) => {
    e.preventDefault();
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <footer style={{ marginTop: 100 }} className="gauto-footer-area">
      <div className="footer-top-area">
        <Container>
          <Row>
            <Col lg={4}>
              <div className="single-footer">
                <div className="footer-logo">
                  <Link to="/">
                    <img style={{ width: 50, height: 50 }} src={logo} alt="footer-logo" />
                  </Link>
                </div>
                <p>
                  Empowering students and schools with seamless university connections and personalized career guidance
                </p>
                <div className="footer-address">
                  <h3>Head Office</h3>
                  <p>
                    125 Big fella St. Road, <span>New York, Hi 5654775</span>
                  </p>
                  <ul>
                    <li>Phone: 326487652 </li>
                    <li>Email:thanhnhat@gmail.com</li>
                    <li>Office Time: 9AM- 4PM</li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="single-footer quick_links">
                <h3>{t("quick_links")}</h3>
                <ul className="quick-links">
                  <li>
                    <Link to="/" onClick={onClick}>
                      {" "}
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      Our Service
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      Contact Us
                    </Link>
                  </li>
                </ul>
                <ul className="quick-links">
                  <li>
                    <Link to="/" onClick={onClick}>
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      Latest News
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="single-footer newsletter_box">
                <h3>{t("footer.newsletter")}</h3>
                <form onSubmit={SubmitHandler}>
                  <input type="email" placeholder="Email Address" />
                  <button type="submit">
                    <FaPaperPlane />
                  </button>
                </form>
              </div>
            </Col>
            <Col lg={4}>
              <div className="single-footer">
                <h3>Recent Post</h3>
                <ul>
                  <li>
                    <div className="single-footer-post">
                      <div className="footer-post-image">
                        <Link to="/blog-single">
                          <img src={img1} alt="footer post" />
                        </Link>
                      </div>
                      <div className="footer-post-text">
                        <h3>
                          <Link to="/blog-single">
                            Revealed: How to set goals for you and your team
                          </Link>
                        </h3>
                        <p>Posted on: Jan 12, 2019</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="single-footer-post">
                      <div className="footer-post-image">
                        <Link to="/blog-single">
                          <img src={img2} alt="footer post" />
                        </Link>
                      </div>
                      <div className="footer-post-text">
                        <h3>
                          <Link to="/blog-single">
                            Revealed: How to set goals for you and your team
                          </Link>
                        </h3>
                        <p>Posted on: Jan 12, 2019</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="single-footer-post">
                      <div className="footer-post-image">
                        <Link to="/blog-single">
                          <img src={img3} alt="footer post" />
                        </Link>
                      </div>
                      <div className="footer-post-text">
                        <h3>
                          <Link to="/blog-single">
                            apartment in the sky love three boys of his own.
                          </Link>
                        </h3>
                        <p>Posted on: Jan 12, 2019</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom-area">
        <Container>
          <Row>
            <Col md={6}>
              <div className="copyright">
                <p>
                  Design With <FaHeart /> from{" "}
                  <Link to="/" onClick={onClick}>
                    Themescare
                  </Link>
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="footer-social">
                <ul>
                  <li>
                    <Link to="/" onClick={onClick}>
                      <FaFacebookF />
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      <FaTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      <FaLinkedinIn />
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={onClick}>
                      <FaSkype />
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
