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
    height: '400px',
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
  console.log('news', news);
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
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </h3>

        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://tuyensinh.ueh.edu.vn/wp-content/uploads/2024/06/1920x1080.png"
              alt="img"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/large_xet_hoc_ba_1920x1080_01_5d8328bee8.jpg"
              alt="img"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://www.hoasen.edu.vn/tuyensinh/wp-content/uploads/sites/7/2024/07/tuyensinh.png"
              alt="img"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </h3>
        </div>
      </Carousel>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 10 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Về chúng tôi
        </Typography>
        <Typography variant="body1" gutterBottom>
          Chúng tôi là một đội ngũ các chuyên gia tận tâm, cam kết mang đến dịch vụ tốt nhất cho khách hàng. Với kinh nghiệm sâu rộng trong lĩnh vực của mình, chúng tôi không ngừng nỗ lực cải thiện chất lượng dịch vụ và đảm bảo sự hài lòng của khách hàng. Chúng tôi tin rằng mỗi khách hàng đều xứng đáng được phục vụ theo cách tốt nhất có thể, vì vậy chúng tôi luôn lắng nghe và tìm kiếm những phương pháp sáng tạo mới để đáp ứng nhu cầu của họ. Sự hài lòng của khách hàng là ưu tiên hàng đầu và là động lực thúc đẩy sự phát triển không ngừng của chúng tôi.
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, m: 10 }}>
        <Grid container spacing={2} >
          <Grid size={5} sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {/* <ImageList
                sx={{ width: 500, height: 290 }}
                variant="quilted"
                cols={4}
                rowHeight={140}
              >
                {itemData.map((item) => (
                  <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                      {...srcset(item.img, 121, item.rows, item.cols)}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList> */}
              <img
                src="assets/images/avatars/Admiss1.png"
                alt="img"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
            </Box>
          </Grid>
          <Grid xs={12} size={7}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 'light',
                  textAlign: { xs: 'center', sm: 'center', md: 'left' } // Chỉ căn giữa cho xs và sm, căn trái cho md trở lên
                }}
                variant="inherit"
                component="h2"
                gutterBottom
              >

                Mục tiêu chính của chúng ta là gì?
              </Typography>
              <Typography
                sx={{
                  textAlign: { xs: 'center', sm: 'center', md: 'left' } // Chỉ căn giữa cho xs và sm, căn trái cho md trở lên
                }}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Mục tiêu của chúng tôi là cung cấp dịch vụ tốt nhất cho khách hàng.
              </Typography>
              <Typography
                sx={{
                  textAlign: { xs: 'center', sm: 'center', md: 'left' } // Chỉ căn giữa cho xs và sm, căn trái cho md trở lên
                }}
                variant="body1"
                gutterBottom
              >
                Chúng tôi là một đội ngũ các chuyên gia tận tâm, được thúc đẩy bởi sứ mệnh mang lại những dịch vụ xuất sắc cho cả học sinh và giáo viên trong cộng đồng học thuật. Mục tiêu của chúng tôi là tạo ra một môi trường phong phú, hỗ trợ và hấp dẫn, nơi mỗi cá nhân đều có thể phát triển. Chúng tôi tin vào sức mạnh chuyển đổi của giáo dục và luôn tìm kiếm những cách sáng tạo để nâng cao dịch vụ của mình, cho dù đó là thông qua công nghệ tiên tiến, hỗ trợ cá nhân hóa hay quy trình tối ưu hóa đáp ứng nhu cầu riêng biệt của các trường trung học và đại học.
              </Typography>
              <Typography
                sx={{
                  textAlign: { xs: 'center', sm: 'center', md: 'left' } // Chỉ căn giữa cho xs và sm, căn trái cho md trở lên
                }}
                variant="body1"
                gutterBottom
              >
                Sự cam kết của chúng tôi với việc cải tiến liên tục đảm bảo rằng chúng tôi luôn đi đầu trong các xu hướng giáo dục, cung cấp một nền tảng nơi học sinh có thể dễ dàng tiếp cận tài nguyên và giáo viên có thể thúc đẩy sự xuất sắc trong học tập. Bằng cách tập trung vào việc tạo ra những mối quan hệ ý nghĩa và bền vững với người dùng, chúng tôi không chỉ đáp ứng nhu cầu của họ mà còn vượt qua mong đợi của họ, đảm bảo sự thành công và hài lòng của họ trong mọi tương tác với nền tảng của chúng tôi.
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
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div className="client-image" style={{ width: '70px', height: '50px', borderRadius: '50%' }}>
                                <img src={item.imageUrl || img1} alt="testimonial" />
                              </div>
                              <div className="client-info">
                                <h3>
                                  {item.title.length > 50
                                    ? `${item.title.substring(0, 50)}...`
                                    : item.title}
                                </h3>
                                <p>FPT</p>
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