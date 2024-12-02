import React, { useState, useEffect } from 'react';
import { message } from 'antd';

import Container from '@mui/material/Container';
import Grid from '@mui/system/Grid';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { FaUniversity } from "react-icons/fa";
import ApexCharts from 'apexcharts';
import { Box, margin } from '@mui/system';

import AppWidgetSummary from '../app-widget-summary';
import AppCurrentVisits from '../app-current-visits';
import ChartMix from '../chartMix';
import ChartPie from '../chartPie';
import ChartRevenue from '../chartRevenue';
import AppWebsiteVisits from '../app-website-visits';
import AppWebsiteTransactions from '../app-website-Transaction';
// import {getDashBoard} from '../../../store/dashboard/action';
import dashBoardService from '../../../services/dashBoardService';





// ----------------------------------------------------------------------

// const seriesData = [
//   {
//     name: "Total test in month",
//     data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10, 18, 24, 29, 31, 25, 28, 35, 40, 37, 33, 25, 22, 27, 20, 18, 16, 23, 19]
//   },
//   // {
//   //   name: "Total test in week",
//   //   data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
//   // },
//   // {
//   //   name: 'Total test in year',
//   //   data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
//   // },
// ];

// Hàm tạo danh sách `categories` động
// function getCategoriesByName(name) {
//   switch (name) {
//     case 'Total test in month':
//       return Array.from({ length: 30 }, (_, i) => `${i + 1} Jan`); // 30 ngày
//     case 'Total test in week':
//       return Array.from({ length: 12 }, (_, i) => `Tuần ${i + 1}`); // 12 tuần
//     case 'Total test in year':
//       return Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`); // 12 tháng
//     default:
//       return [];
//   }
// }

export default function AppView() {
  // useEffect(() => {
  //   const options = {
  //     series: seriesData,
  //     chart: {
  //       height: 470,
  //       margin: 0,
  //       type: 'line',
  //       zoom: { enabled: false },
  //       events: {
  //         legendClick(chartContext, seriesIndex, config) {
  //           const activeSeries = chartContext.w.config.series[seriesIndex].name;
  //           chartContext.updateOptions({
  //             xaxis: { categories: getCategoriesByName(activeSeries) }
  //           });
  //         }
  //       }
  //     },
  //     xaxis: { categories: getCategoriesByName("Total test in month") },
  //     dataLabels: { enabled: false },
  //     stroke: {
  //       width: [5, 7, 5],
  //       curve: 'straight',
  //       dashArray: [0, 8, 5]
  //     },
  //     title: {
  //       text: 'Total test in month',
  //       align: 'left'
  //     },
  //     legend: {
  //       tooltipHoverFormatter(val, opts) {
  //         return `${val} - <strong>${opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]}</strong>`;
  //       }
  //     },
  //     markers: {
  //       size: 0,
  //       hover: { sizeOffset: 6 }
  //     },
  //     tooltip: {
  //       y: [
  //         { title: (val) => `${val} (mins)` },
  //         { title: (val) => `${val} per session` },
  //         { title: (val) => val }
  //       ]
  //     },
  //     grid: {
  //       borderColor: '#f1f1f1'
  //     }
  //   };

  //   // Khởi tạo biểu đồ với cấu hình `options`
  //   const chart = new ApexCharts(document.querySelector("#chart"), options);
  //   chart.render();

  //   // Cleanup chart instance when component unmounts
  //   return () => {
  //     chart.destroy();
  //   };
  // }, []);
  const [data, setData] = useState([]);
  const totalMBTITests = data.numberOfMBTITestsInMonth?.reduce((sum, value) => sum + value, 0);
  const totalHollandTests = data.numberOfHollandTestsInMonth?.reduce((sum, value) => sum + value, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashBoardService.getDashBoard();
        setData(res.data);
      } catch (error) {
        message.error(error.response.data.message);
      }
    };
    fetchData();
  }
    , []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Quản lý hệ thống
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Tổng trường cấp 3"
            total={data?.totalHighSchools}
            color="success"
            icon={<SchoolIcon sx={{ width: 50, height: 50, color: '#86efac' }} />}
          />
        </Grid>


        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Tổng Học sinh"
            total={data?.totalStudents}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" style={{ width: 50, height: 50 }} />}
          />
        </Grid>

        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Tổng trường đại học"
            total={data?.totalUniversities}
            color="warning"
            icon={<SchoolIcon sx={{ width: 50, height: 50, color: '#15803d' }} />}
          />
        </Grid>
        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Tổng tài khoản"
            total={data?.numberAccount}
            color="error"
            icon={<AccountBoxIcon sx={{ width: 50, height: 50, color: '#f50057' }} />}
          />
        </Grid>

        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Tổng điểm học sinh nạp trong tháng"
            total={data?.totalPointRechargeStudent}
            color="error"
            icon={<CurrencyBitcoinIcon sx={{ width: 50, height: 50, color: '#f50057' }} />}
          />
        </Grid>

        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Tổng điểm admin chuyển trong tháng"
            total={data?.totalPointAdminTransferring}
            color="error"
            icon={<CurrencyBitcoinIcon sx={{ width: 50, height: 50, color: '#f50057' }} />}
          />
        </Grid>

        <Grid size={{ md: 8 }}>
          <AppWebsiteVisits
            title="Bài kiểm tra"
            chart={{
              labels: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ],
              series: [
                {
                  name: 'MBTI',
                  type: 'column',
                  fill: 'solid',
                  data: data?.numberOfMBTITestsInMonth || [],
                },
                {
                  name: 'Holland',
                  type: 'area',
                  fill: 'gradient',
                  data: data?.numberOfHollandTestsInMonth || [],
                },
              ],
            }}
          />
        </Grid>

        <Grid size={{ md: 4 }}>
          <AppCurrentVisits
            title="Loại bài kiểm tra"
            chart={{
              // colors: ['#FF5733', '#33FF57'], // Thêm màu mặc định
              series: [
                { label: 'MBTI', value: totalMBTITests },
                { label: 'HOLLAND', value: totalHollandTests },
              ],
              // options: {}, // Tránh undefined
            }}
          />
        </Grid>
        {/* <Grid size={{ md: 8 }}>
          <AppWebsiteTransactions
            title="Doanh số"
            chart={{
              labels: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ],
              series: [
                {
                  name: 'Admin',
                  type: 'column',
                  fill: 'solid',
                  data: [20, 45, 12, 65, 40, 98, 202, 60, 18, 18, 21, 45],
                },
                {
                  name: 'Trường đại học',
                  type: 'area',
                  fill: 'gradient',
                  data: [21, 120, 340, 521, 21, 61, 43, 32, 56, 89, 90, 120],
                },
                {
                  name: 'Trường cấp 3',
                  type: 'area',
                  fill: 'gradient',
                  data: [21, 120, 23, 56, 21, 61, 43, 32, 56, 76, 45, 98],
                },
                // {
                //   name: 'Nhận tiền',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [11, 221, 12, 12, 121, 23, 12, 32, 24, 21, 21, 12],
                // },
              ],
            }}
          />
        </Grid>
        <Grid size={{ md: 4 }}>
          <AppCurrentVisits
            title="Loại giao dịch"
            chart={{
              series: [
                { label: 'Admin', value: 4344 },
                { label: 'Trường đại học', value: 5435 },
                { label: 'Trường cấp 3', value: 4344 },
                // { label: 'Nhận tiền', value: 5435 },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid size={{ sx: 12, sm: 12, lg: 8 }}>
          <ChartMix />
        </Grid>


        <Grid size={{ sx: 12, md: 6, lg: 4 }}>
          <ChartPie />
        </Grid>
        <Grid size={{ sx: 12, sm: 12, lg: 8 }}>
          <ChartRevenue />
        </Grid>
 */}

      </Grid>
    </Container>

  );
}
