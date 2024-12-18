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
import dashBoardService from '../../../../services/dashBoardService';





// ----------------------------------------------------------------------


export default function AppViewUni() {

  const [data, setData] = useState([]);
  const totalMBTITests = data.numberOfMBTITestsInMonth?.reduce((sum, value) => sum + value, 0);
  const totalHollandTests = data.numberOfHollandTestsInMonth?.reduce((sum, value) => sum + value, 0);

  let userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashBoardService.getDashBoardUni({ userId });
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
            title="Số lượng tư vấn viên của trường đại học"
            total={data?.numberConsultant}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" style={{ width: 50, height: 50 }} />}
          />
        </Grid>

        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Tổng điểm nhận trong tháng"
            total={data?.totalPointReceive}
            color="error"
            icon={<CurrencyBitcoinIcon sx={{ width: 50, height: 50, color: '#f50057' }} />}
          />
        </Grid>

        <Grid size={{ sx: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Tổng điểm chuyển trong tháng"
            total={data?.totalPointTransfer}
            color="error"
            icon={<CurrencyBitcoinIcon sx={{ width: 50, height: 50, color: '#f50057' }} />}
          />
        </Grid>

        <Grid size={{ md: 12 }}>
          <AppWebsiteVisits
            title="Số điểm chuyển"
            chart={{
              labels: [
                'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
              ],
              series: [
                {
                  name: 'Điểm',
                  type: 'column',
                  fill: 'solid',
                  data: data?.numberOfPointTransferringInMonth || [],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>

  );
}
