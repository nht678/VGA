import React, { useState, useEffect } from 'react';

import ApexCharts from 'apexcharts';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';








export default function ChartMix() {
    useEffect(() => {
        let options = {
            series: [{
                name: 'Kiểm tra Holland',
                type: 'area',
                data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
            }, {
                name: 'Kiểm tra MBTI',
                type: 'line',
                data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
            }],
            chart: {
                height: 350,
                type: 'line',
            },
            stroke: {
                curve: 'smooth'
            },
            fill: {
                type: 'solid',
                opacity: [0.35, 1],
            },
            labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06', 'Dec 07', 'Dec 08', 'Dec 09', 'Dec 10', 'Dec 11'],
            markers: {
                size: 0
            },
            yaxis: [
                {
                    title: {
                        text: 'holland test',
                    },
                },
                {
                    opposite: true,
                    title: {
                        text: 'MBTI test',
                    },
                },
            ],
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function formatTooltip(y) {
                        if (typeof y !== "undefined") {
                            return `${y.toFixed(0)} points`;
                        }
                        return y;
                    }
                }
            }
        };

        let chart = new ApexCharts(document.querySelector("#chartMix"), options);
        chart.render();

        // Cleanup to destroy the chart when the component unmounts
        return () => {
            chart.destroy();
        };
    }, []);
    return (
        <Box>
            <Typography variant='h6'>
                Kiểm tra Holland và MBTI
            </Typography>
            <Box id="chartMix" sx={(theme) => ({
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
            />

        </Box>
    );

}

