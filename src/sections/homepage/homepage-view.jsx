import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Carousel } from 'antd';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { CheckIcon } from '@heroicons/react/20/solid'
import './style.css';

import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { FaQuoteRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../../public/assets/images/avatars/image_1.png';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const tiers = [
  {
    name: 'Hobby',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '$19',
    description: "The perfect plan if you're just getting started with our product.",
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
    featured: false,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$49',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      'Dedicated support representative',
      'Marketing automations',
      'Custom integrations',
    ],
    featured: true,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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


  return (
    <Box className='bg-emerald-50 pb-20'>
      <Carousel autoplay >
        <div>
          <h3 style={contentStyle}>
            <img
              src="assets/images/avatars/University1.png"
              alt="img"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </h3>

        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="assets/images/avatars/University2.png"
              alt="img"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="assets/images/avatars/University3.png"
              alt="img"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="assets/images/avatars/University4.png"
              alt="img"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </h3>
        </div>
      </Carousel>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 10 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          About us
        </Typography>
        <Typography variant="body1" gutterBottom>
          We are a team of dedicated professionals committed to delivering the best service to our customers. With extensive experience in our field, we continuously strive to improve service quality and ensure customer satisfaction. We believe that every customer deserves to be served in the best possible way, so we always listen and seek new, creative methods to meet their needs. Customer satisfaction is our top priority and the driving force behind our continuous development.
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, m: 10 }}>
        <Grid container spacing={2} >
          <Grid size={5} sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <ImageList
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
              </ImageList>

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
                {'What is our main goal'}
              </Typography>
              <Typography
                sx={{
                  textAlign: { xs: 'center', sm: 'center', md: 'left' } // Chỉ căn giữa cho xs và sm, căn trái cho md trở lên
                }}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Our goal is to provide the best service to our customers
              </Typography>
              <Typography
                sx={{
                  textAlign: { xs: 'center', sm: 'center', md: 'left' } // Chỉ căn giữa cho xs và sm, căn trái cho md trở lên
                }}
                variant="body1"
                gutterBottom
              >
                We are a team of committed professionals, driven by the mission of delivering exceptional services to both students and educators within the academic community. Our goal is to create an enriching, supportive, and engaging environment where every individual can thrive. We believe in the transformative power of education and are constantly seeking innovative ways to enhance our offerings, whether through cutting-edge technology, personalized support, or streamlined processes that cater to the unique needs of high schools and universities.
              </Typography>
              <Typography
                sx={{
                  textAlign: { xs: 'center', sm: 'center', md: 'left' } // Chỉ căn giữa cho xs và sm, căn trái cho md trở lên
                }}
                variant="body1"
                gutterBottom
              >
                Our dedication to continuous improvement ensures that we stay ahead of educational trends, providing a platform where students can easily access resources and educators can foster academic excellence. By focusing on creating meaningful and lasting relationships with our users, we strive to not only meet their needs but exceed their expectations, ensuring their success and satisfaction in all interactions with our platform.
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
                  <h3 style={{ textAlign: 'center', color: 'red' }}>News</h3>
                  <h2 style={{ textAlign: 'center' }} >News in Day</h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Slider className="testimonial-slider" {...settings}>
                  <div className="slide">
                    <div className="single-testimonial">
                      <div className="testimonial-text">
                        <p>
                          Dorem ipsum dolor sit amet, consectetur adipisicing elit,
                          sed do eiusm tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat
                          adipisicing elit.
                        </p>
                        <div className="testimonial-meta" style={{ display: "flex", alignItems: "center" }}>
                          <div className="client-image">
                            <img src={img1} alt="testimonial" />
                          </div>
                          <div className="client-info">
                            <h3>Marco Ghaly</h3>
                            <p>{t("customer")}</p>
                          </div>
                        </div>
                        <FaQuoteRight />
                      </div>
                    </div>
                  </div>
                  <div className="slide">
                    <div className="single-testimonial">
                      <div className="testimonial-text">
                        <p>
                          Forem ipsum dolor sit amet, consectetur adipisicing elit,
                          sed do eiusm tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat
                          adipisicing elit.
                        </p>
                        <div className="testimonial-meta" style={{ display: "flex", alignItems: "center" }}>
                          <div className="client-image">
                            <img src={img1} alt="testimonial" />
                          </div>
                          <div className="client-info">
                            <h3>Sherief Arafa</h3>
                            <p>{t("customer")}</p>
                          </div>
                        </div>
                        <FaQuoteRight />
                      </div>
                    </div>
                  </div>
                  <div className="slide">
                    <div className="single-testimonial">
                      <div className="testimonial-text">
                        <p>
                          Dorem ipsum dolor sit amet, consectetur adipisicing elit,
                          sed do eiusm tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat
                          adipisicing elit.
                        </p>
                        <div className="testimonial-meta" style={{ display: "flex", alignItems: "center" }}>
                          <div className="client-image">
                            <img src={img1} alt="testimonial" />
                          </div>
                          <div className="client-info">
                            <h3>Marco Ghaly</h3>
                            <p>{t("customer")}</p>
                          </div>
                        </div>
                        <FaQuoteRight />
                      </div>
                    </div>
                  </div>
                  <div className="slide">
                    <div className="single-testimonial">
                      <div className="testimonial-text">
                        <p>
                          Dorem ipsum dolor sit amet, consectetur adipisicing elit,
                          sed do eiusm tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat
                          adipisicing elit.
                        </p>
                        <div className="testimonial-meta" style={{ display: "flex", alignItems: "center" }}>
                          <div className="client-image" >
                            <img src={img1} alt="testimonial" />
                          </div>
                          <div className="client-info">
                            <h3>Marco Ghaly</h3>
                            <p>{t("customer")}</p>
                          </div>
                        </div>
                        <FaQuoteRight />
                      </div>
                    </div>
                  </div>
                </Slider>
              </Col>
            </Row>
          </Container>
        </section>
      </Box>
      {/* <Box sx={{flexGrow:1, mx:10}}>
        <Team/>
      </Box> */}
      {/* <Box sx={{mx:30}}>
        <Help />
      </Box> */}
      <Box sx={{ mx: 10 }}>
        <Typography sx={{ textAlign: 'center' }} variant="h4" component="h2" gutterBottom>
          Experts
        </Typography>
        <Typography sx={{ textAlign: 'center' }} variant="h3" gutterBottom>
          Our Members
        </Typography>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Item>
              <Card sx={{ maxWidth: 270 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="250"
                  image="/assets/images/avatars/avatar_1.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item>
              <Card sx={{ maxWidth: 270 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="250"
                  image="/assets/images/avatars/avatar_2.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Item>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Item>
              <Card sx={{ maxWidth: 270 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="250"
                  image="/assets/images/avatars/avatar_3.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Item>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Item>
              <Card sx={{ maxWidth: 270 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="250"
                  image="/assets/images/avatars/avatar_7.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, mx: 30, my: 10, bgcolor: 'rgba(0, 0, 0, 0.8)', height: 250, borderRadius: 2, display: 'flex', alignItems: 'center' }} >
        <Box>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
            With Over 4 Partners
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
            We are always here and ready to assist you with any challenges or problems you may encounter. Whether you are facing technical difficulties, need guidance with a project, or have questions about a specific task, we are committed to providing you with the support and solutions you need.
          </Typography>
          <Grid container spacing={2} >
            <Grid size={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
              <PhoneOutlinedIcon sx={{ height: 50, width: 50, color: 'white' }} />
            </Grid>
            <Grid size={7} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'white', textAlign: 'start' }}>
                Need any help?
              </Typography>
              <Typography variant='h4' sx={{ color: 'white', textAlign: 'start' }}>
                <a href="tel:4315292093">(431) 529 2093</a>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        <Typography sx={{ textAlign: 'center' }} variant="h4" component="h2" gutterBottom>
          See Our
        </Typography>
        <Typography sx={{ textAlign: 'center' }} variant="h3" gutterBottom>
          Lastest Services
        </Typography>
        <Box>
          <Grid sx={{ justifyContent: 'center' }} container spacing={2} >
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 250 }}
                  image="/assets/images/avatars/image_1.png"
                  title="green iguana"
                />
                <CardContent>
                  <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
                    Pro 1 năm
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>

              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 250 }}
                  image="/assets/images/avatars/image_1.png"
                  title="green iguana"
                />
                <CardContent>
                  <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
                    Pro 1 năm
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>

              </Card>
              {/* <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
              <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
                <div
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                  className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                />
              </div>
              <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
                <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  The right price for you, whoever you are
                </p>
              </div>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
                Qui iusto aut est earum eos quae. Eligendi est at nam aliquid ad quo reprehenderit in aliquid fugiat dolorum
                voluptatibus.
              </p>
              <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
                {tiers.map((tier, tierIdx) => (
                  <div
                    key={tier.id}
                    className={classNames(
                      tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
                      tier.featured
                        ? ''
                        : tierIdx === 0
                          ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                          : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                      'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
                    )}
                  >
                    <h3
                      id={tier.id}
                      className={classNames(
                        tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                        'text-base font-semibold leading-7',
                      )}
                    >
                      {tier.name}
                    </h3>
                    <p className="mt-4 flex items-baseline gap-x-2">
                      <span
                        className={classNames(
                          tier.featured ? 'text-white' : 'text-gray-900',
                          'text-5xl font-bold tracking-tight',
                        )}
                      >
                        {tier.priceMonthly}
                      </span>
                      <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/month</span>
                    </p>
                    <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base leading-7')}>
                      {tier.description}
                    </p>
                    <ul
                      role="list"
                      className={classNames(
                        tier.featured ? 'text-gray-300' : 'text-gray-600',
                        'mt-8 space-y-3 text-sm leading-6 sm:mt-10',
                      )}
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            aria-hidden="true"
                            className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={tier.href}
                      aria-describedby={tier.id}
                      className={classNames(
                        tier.featured
                          ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                          : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                        'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                      )}
                    >
                      Get started today
                    </a>
                  </div>
                ))}
              </div>
            </div> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>

  );
}