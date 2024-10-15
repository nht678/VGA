import React, { useState, useEffect } from 'react';

import ApexCharts from 'apexcharts';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';

export default function ChartPie() {
    useEffect(() => {
        let options = {
            series: [44, 55],
            chart: {
                width: 380,
                type: 'pie',
                height: 350,

            },
            labels: ['Kiểm tra Holland', 'Kiểm tra MBTI'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        let chart = new ApexCharts(document.querySelector("#chartPie"), options);
        chart.render();

        // Cleanup to destroy the chart when the component unmounts
        return () => {
            chart.destroy();
        };
    }, []);

    return (
        <Box>
            <Typography variant='h6'>
                Loại hình kiểm tra
            </Typography>
            <Box id="chartPie" sx={(theme) => ({
                boxShadow: 10,
                bgcolor: '#fff',
                color: 'grey.800',
                p: 1,
                m: 0,
                height: 350,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...theme.applyStyles('dark', {
                    bgcolor: '#101010',
                    color: 'grey.300',
                }),
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',

            })}
            />
        </Box>
    );

}