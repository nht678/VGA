import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/system/Grid';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import { FaUniversity } from "react-icons/fa";
import ApexCharts from 'apexcharts';
import { Box, margin } from '@mui/system';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';


// ----------------------------------------------------------------------

const seriesData = [
  {
    name: "Total test in month",
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10, 18, 24, 29, 31, 25, 28, 35, 40, 37, 33, 25, 22, 27, 20, 18, 16, 23, 19]
  },
  // {
  //   name: "Total test in week",
  //   data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
  // },
  // {
  //   name: 'Total test in year',
  //   data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
  // },
];

// Hàm tạo danh sách `categories` động
function getCategoriesByName(name) {
  switch (name) {
    case 'Total test in month':
      return Array.from({ length: 30 }, (_, i) => `${i + 1} Jan`); // 30 ngày
    case 'Total test in week':
      return Array.from({ length: 12 }, (_, i) => `Tuần ${i + 1}`); // 12 tuần
    case 'Total test in year':
      return Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`); // 12 tháng
    default:
      return [];
  }
}
export default function AppView() {
  useEffect(() => {
    const options = {
      series: seriesData,
      chart: {
        height: 470,
        margin: 0,
        type: 'line',
        zoom: { enabled: false },
        events: {
          legendClick(chartContext, seriesIndex, config) {
            const activeSeries = chartContext.w.config.series[seriesIndex].name;
            chartContext.updateOptions({
              xaxis: { categories: getCategoriesByName(activeSeries) }
            });
          }
        }
      },
      xaxis: { categories: getCategoriesByName("Total test in month") },
      dataLabels: { enabled: false },
      stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      title: {
        text: 'Total test in month',
        align: 'left'
      },
      legend: {
        tooltipHoverFormatter(val, opts) {
          return `${val} - <strong>${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}</strong>`;
        }
      },
      markers: {
        size: 0,
        hover: { sizeOffset: 6 }
      },
      tooltip: {
        y: [
          { title: (val) => `${val} (mins)` },
          { title: (val) => `${val} per session` },
          { title: (val) => val }
        ]
      },
      grid: {
        borderColor: '#f1f1f1'
      }
    };

    // Khởi tạo biểu đồ với cấu hình `options`
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Cleanup chart instance when component unmounts
    return () => {
      chart.destroy();
    };
  }, []);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Total HighSchools"
            total={714000}
            color="success"
            icon={<SchoolIcon sx={{ width: 50, height: 50, color: '#86efac' }} />}
          />
        </Grid>


        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Total Students"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" style={{ width: 50, height: 50 }} />}
          />
        </Grid>

        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Total Universities"
            total={1723315}
            color="warning"
            icon={<SchoolIcon sx={{ width: 50, height: 50, color: '#15803d' }} />}
          />
        </Grid>

        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Total Transactions"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" style={{ width: 50, height: 50 }} />}
          />
        </Grid>
        <Grid size={{ sx: 12, sm: 12, lg: 8 }}>
          <Box id="chart" sx={(theme) => ({
            boxShadow: 10,
            bgcolor: '#fff',
            color: 'grey.800',
            p: 1,
            m: 0,
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: '700',
            ...theme.applyStyles('dark', {
              bgcolor: '#101010',
              color: 'grey.300',
            }),
          })}
          >
            a
          </Box>
        </Grid>


        <Grid size={{ sx: 12, md: 6, lg: 4 }}>
          <AppCurrentVisits
            title="Type Test"
            chart={{
              series: [
                { label: 'Holland', value: 4344 },
                { label: 'MBTI', value: 5435 },
                // { label: 'Europe', value: 1443 },
                // { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        {/* <Grid size={{ sx: 12, md: 6, lg: 8 }}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ sx: 12, md: 6, lg: 4 }}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

        <Grid size={{ sx: 12, md: 6, lg: 8 }}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid size={{ sx: 12, md: 6, lg: 4 }}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        {/* <Grid size={{ sx: 12, md: 6, lg: 4 }}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid size={{ sx: 12, md: 6, lg: 8 }}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>

  );
}
