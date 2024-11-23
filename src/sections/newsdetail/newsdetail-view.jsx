import * as React from 'react';
// useState useEffect 
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box } from '@mui/system';
// import useparam 
import { useParams } from 'react-router-dom';
// useSelector useDispatch
import { Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actGetNewsByIdAsync } from '../../store/NewsForUniversity/action';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function NewsDetailView() {
    // useparam
    let { id } = useParams();
    console.log(id);
    const { newsById } = useSelector((state) => state.newsForUniversityReducer);
    // useEffect
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actGetNewsByIdAsync(id));
    }, [id]);




    return (
        <Box role="presentation" onClick={handleClick} sx={{ m: 20 }}>
            <Typography variant="h4" sx={{ mb: 5, mt: 2 }}>
                {newsById?.title || 'Chưa có tiêu đề'}
            </Typography>

            <Typography variant="body1" sx={{ mb: 5 }}>
                {newsById?.content || 'Chưa có nội dung'}
            </Typography>
            {newsById?.imageNews?.map((image, index) => (
                <Box key={index} sx={{ m: 10 }}>
                    <Image
                        style={{ margin: 'auto' }}
                        width={'90%'}
                        height={500}
                        src={image?.imageUrl}
                        alt={image?.descriptionTitle || 'Ảnh tin tức'}
                    />
                    <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                        {image?.descriptionTitle || 'Không có mô tả'}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}