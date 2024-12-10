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


export default function AppView() {

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
