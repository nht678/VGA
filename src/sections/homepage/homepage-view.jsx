import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid2';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.css';

import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { FaQuoteRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../../public/assets/images/avatars/image_1.png';

import { actGetNewsAsync } from '../../store/NewsForUniversity/action';




export default function HomepageView() {

  const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '400px',
    textAlign: 'center',
    background: '#364d79',
    marginTop: '0px'
  };

  const itemData = [
    {
      img: 'assets/images/avatars/Admiss1.png',
      title: 'Breakfast',
      rows: 2,
      cols: 2,
    },
    {
      img: 'assets/images/avatars/Admiss2.png',
      title: 'Burger',
    },
    {
      img: 'assets/images/avatars/Admiss3.png',
      title: 'Camera',
    },
    {
      img: 'assets/images/avatars/Admiss4.png',
      title: 'Coffee',
      cols: 2,
    },
  ];


  const { t } = useTranslation();

  const settings = {
    dots: true,
    arrows: false,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          infinite: true,
          centerMode: false,
        },
      },
    ],
  };

  const { news, total = 0, success } = useSelector((state) => state.newsForUniversityReducer);
  let userId = localStorage.getItem('userId');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetNewsAsync({}));
  }, [success]);


  return (
    <Box className=' pb-20'>
      <Carousel autoplay >
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://dnuni.fpt.edu.vn/wp-content/uploads/2022/02/Untitled-design-12-min-1600x900.png"
              alt="img"
              style={{ width: '100%', height: '600px', objectFit: 'cover' }}
            />
          </h3>

        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://tuyensinh.ueh.edu.vn/wp-content/uploads/2024/06/1920x1080.png"
              alt="img"
              style={{ width: '100%', height: '600px', objectFit: 'cover' }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/large_xet_hoc_ba_1920x1080_01_5d8328bee8.jpg"
              alt="img"
              style={{ width: '100%', height: '600px', objectFit: 'cover' }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://www.hoasen.edu.vn/tuyensinh/wp-content/uploads/sites/7/2024/07/tuyensinh.png"
              alt="img"
              style={{ width: '100%', height: '600px', objectFit: 'cover' }}
            />
          </h3>
        </div>
      </Carousel>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 10 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Về chúng tôi
        </Typography>
        <Typography variant="body1" gutterBottom>
          Hệ thống của chúng tôi là một nền tảng tiên tiến, kết nối chặt chẽ giữa các trường đại học, trường trung học, và học sinh, nhằm tạo ra một môi trường giáo dục hiện đại và hiệu quả. Với sứ mệnh đồng hành cùng các trường đại học trong việc quảng bá ngành học và thu hút học sinh tiềm năng, chúng tôi cung cấp các công cụ hỗ trợ tối ưu như tổ chức bài test định hướng, các sự kiện tương tác, và buổi tư vấn trực tiếp. Đồng thời, hệ thống giúp các trường trung học dễ dàng quản lý danh sách học sinh, phân bổ Gold một cách khoa học, và theo dõi tiến trình học tập của từng cá nhân. Đối với học sinh, đây không chỉ là nơi khám phá bản thân mà còn là cánh cửa mở ra cơ hội được tư vấn chuyên sâu và tham gia các hoạt động thiết thực, giúp định hướng rõ ràng cho tương lai học tập và nghề nghiệp.
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, m: 10 }}>
        <Grid container spacing={2} >
          <Grid size={5} sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="https://th.bing.com/th/id/OIP.CCjnIlqaCdwnlp1TxmsRowHaEJ?w=626&h=351&rs=1&pid=ImgDetMain"
                alt="img"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
            </Box>
          </Grid>
          <Grid xs={12} size={7}>
            <Box>

              <Typography
                sx={{
                  textAlign: { xs: 'center', sm: 'center', md: 'left' } // Chỉ căn giữa cho xs và sm, căn trái cho md trở lên
                }}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Mục tiêu chính của chúng tôi là gì?
              </Typography>
              <Typography
                sx={{
                  textAlign: { xs: 'center', sm: 'center', md: 'left' } // Chỉ căn giữa cho xs và sm, căn trái cho md trở lên
                }}
                variant="body1"
                gutterBottom
              >
                Mục tiêu của chúng tôi là trở thành cầu nối vững chắc giữa các trường đại học, trường trung học, và học sinh, hỗ trợ tối đa trong hành trình định hướng và phát triển tương lai. Hệ thống được thiết kế để giúp các trường đại học quảng bá ngành học và tổ chức các hoạt động tương tác hiệu quả, tạo cơ hội để tiếp cận học sinh tiềm năng từ các trường trung học.
              </Typography>
              <Typography
                sx={{
                  textAlign: { xs: 'center', sm: 'center', md: 'left' } // Chỉ căn giữa cho xs và sm, căn trái cho md trở lên
                }}
                variant="body1"
                gutterBottom
              >
                Đối với các trường trung học, chúng tôi hướng đến việc cung cấp công cụ quản lý hiện đại, giúp dễ dàng theo dõi và phân bổ Gold đến học sinh. Thông qua đó, nhà trường có thể hỗ trợ học sinh tham gia các bài test, sự kiện, hoặc buổi tư vấn nghề nghiệp từ chuyên gia, giúp các em chuẩn bị tốt hơn cho kỳ thi tuyển sinh đại học. Với các trường đại học, mục tiêu của chúng tôi là tạo ra một kênh liên kết hiệu quả, giúp họ tiếp cận gần hơn với học sinh từ các trường trung học. Các trường đại học có thể giới thiệu chương trình học, ngành nghề và tổ chức các hoạt động tìm hiểu để thu hút những học sinh phù hợp. Đồng thời, thông qua hệ thống Gold, các trường đại học có thể cung cấp các gói tài trợ khuyến khích cho các trường trung học và học sinh tiềm năng.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <section className="gauto-testimonial-area section_70">
          <Container >
            <Row>
              <Col md={12}>
                <div className="site-heading">
                  <h3 style={{ textAlign: 'center', color: 'red' }}>Tin tức</h3>
                  <h2 style={{ textAlign: 'center' }} >Tin tức nổi bật</h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Slider className="testimonial-slider" {...settings}>
                  {news?.map((item, index) => (
                    <Link to={`/newsdetail/${item.id}`} key={item.id} >
                      <div className="slide" key={index}>
                        <div className="single-testimonial">
                          <div className="testimonial-text">
                            <p>
                              {item.content.length > 100
                                ? `${item.content.substring(0, 100)}...`
                                : item.content}
                            </p>
                            <div
                              className="testimonial-meta"
                              style={{ display: "flex", alignItems: "flex-start" }}
                            >
                              <div className="client-image" style={{ width: '70px', height: '50px', borderRadius: '50%' }}>
                                <img
                                  src={item?.universityImageUrl || img1}
                                  alt="testimonial"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                  }}
                                />
                              </div>
                              <div className="client-info">
                                <h3>
                                  {item.title.length > 50
                                    ? `${item.title.substring(0, 50)}...`
                                    : item.title}
                                </h3>
                                <p>{item?.universityName}</p>
                              </div>
                            </div>
                            <FaQuoteRight />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Slider>
              </Col>
            </Row>


          </Container>
        </section>
      </Box>

    </Box>

  );
}