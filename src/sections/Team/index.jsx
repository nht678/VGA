import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import Grid from '@mui/material/Grid2';
// import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// import img1 from "../../img/driver-1.jpg";
import img1 from "../../../public/assets/images/avatars/avatar_5.jpg";
import img2 from "../../../public/assets/images/avatars/avatar_3.jpg";
import img3 from "../../../public/assets/images/avatars/avatar_4.jpg";
import img4 from "../../../public/assets/images/avatars/avatar_2.jpg";
import "./style.css";

const Team = () => {
  const { t } = useTranslation();

  const onClick = (e) => {
    e.preventDefault();
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    // <section className="gauto-driver-area section_70">
    //  <Box sx={{ flexGrow: 1 }}>
    //     {/* <Grid container spacing={2}>
    //       <Grid size={12}>
    //         <div className="site-heading">
    //           <h4 style={{textAlign:'center'}}>{t("experts")}</h4>
    //           <h2 style={{textAlign:'center'}}>{t("our_members")}</h2>
    //         </div>
    //       </Grid>
    //     </Grid> */}
    //     <Grid md={12} container spacing={2}>
    //       <Grid md={3} xs={12} >
    //         <div className="single-driver">
    //           <div className="driver-image">
    //             <img src={img1} alt="driver 1" />
    //             <div className="hover">
    //               <ul className="social-icon">
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaFacebookF />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaTwitter />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaLinkedinIn />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaInstagram />
    //                   </Link>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //           <div className="driver-text">
    //             <div className="driver-name">
    //               <Link to="/">
    //                 <h3>Marco Ghaly</h3>
    //               </Link>
    //               <p>4 {t("year_experience")}</p>
    //             </div>
    //           </div>
    //         </div>
    //       </Grid>
    //       <Grid md={3} xs={12}>
    //         <div className="single-driver">
    //           <div className="driver-image">
    //             <img src={img2} alt="driver 1" />
    //             <div className="hover">
    //               <ul className="social-icon">
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaFacebookF />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaTwitter />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaLinkedinIn />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaInstagram />
    //                   </Link>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //           <div className="driver-text">
    //             <div className="driver-name">
    //               <Link to="/">
    //                 <h3>Sheref joe</h3>
    //               </Link>
    //               <p>7 {t("year_experience")}</p>
    //             </div>
    //           </div>
    //         </div>
    //       </Grid>
    //       <Grid md={3} xs={12}>
    //         <div className="single-driver">
    //           <div className="driver-image">
    //             <img src={img3} alt="driver 1" />
    //             <div className="hover">
    //               <ul className="social-icon">
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaFacebookF />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaTwitter />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaLinkedinIn />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaInstagram />
    //                   </Link>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //           <div className="driver-text">
    //             <div className="driver-name">
    //               <Link to="/">
    //                 <h3>Arafa lep</h3>
    //               </Link>
    //               <p>3 {t("year_experience")}</p>
    //             </div>
    //           </div>
    //         </div>
    //       </Grid>
    //       <Grid md={3} xs={12}>
    //         <div className="single-driver">
    //           <div className="driver-image">
    //             <img src={img4} alt="driver 1" />
    //             <div className="hover">
    //               <ul className="social-icon">
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaFacebookF />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaTwitter />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaLinkedinIn />
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/" onClick={onClick}>
    //                     <FaInstagram />
    //                   </Link>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //           <div className="driver-text">
    //             <div className="driver-name">
    //               <Link to="/">
    //                 <h3>Endly Kent</h3>
    //               </Link>
    //               <p>4 {t("year_experience")}</p>
    //             </div>
    //           </div>
    //         </div>
    //       </Grid>
    //     </Grid>
    //     {/* <Row>
    //       <Col md={12}>
    //         <div className="load-more">
    //           <Link to="/" onClick={onClick} className="gauto-btn">
    //             {t("more_member")}
    //           </Link>
    //         </div>
    //       </Col>
    //     </Row> */}
    //   </Box>
    // </section>
    <section className="gauto-driver-area section_70">
    <Container>
      <Row>
        <Col md={12}>
          <div className="site-heading">
            <h4>{t("experts")}</h4>
            <h2>{t("our_members")}</h2>
          </div>
        </Col>
      </Row>
      <Row style={{display:"flex"}}>
        <Col lg={3} sm={6}>
          <div className="single-driver">
            <div className="driver-image">
              <img src={img1} alt="driver 1" />
              <div className="hover">
                <ul className="social-icon">
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
                      <FaInstagram />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="driver-text">
              <div className="driver-name">
                <Link to="/">
                  <h3>Marco Ghaly</h3>
                </Link>
                <p>4 {t("year_experience")}</p>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={3} sm={6}>
          <div className="single-driver">
            <div className="driver-image">
              <img src={img2} alt="driver 1" />
              <div className="hover">
                <ul className="social-icon">
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
                      <FaInstagram />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="driver-text">
              <div className="driver-name">
                <Link to="/">
                  <h3>Sheref joe</h3>
                </Link>
                <p>7 {t("year_experience")}</p>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={3} sm={6}>
          <div className="single-driver">
            <div className="driver-image">
              <img src={img3} alt="driver 1" />
              <div className="hover">
                <ul className="social-icon">
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
                      <FaInstagram />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="driver-text">
              <div className="driver-name">
                <Link to="/">
                  <h3>Arafa lep</h3>
                </Link>
                <p>3 {t("year_experience")}</p>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={3} sm={6}>
          <div className="single-driver">
            <div className="driver-image">
              <img src={img4} alt="driver 1" />
              <div className="hover">
                <ul className="social-icon">
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
                      <FaInstagram />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="driver-text">
              <div className="driver-name">
                <Link to="/">
                  <h3>Endly Kent</h3>
                </Link>
                <p>4 {t("year_experience")}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="load-more">
            <Link to="/" onClick={onClick} className="gauto-btn">
              {t("more_member")}
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  );
};

export default Team;
