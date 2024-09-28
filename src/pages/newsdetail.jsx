import React from 'react';
import { Helmet } from 'react-helmet-async';
import NewsDetailView from 'src/sections/newsdetail/newsdetail-view';

export default function NewsDetail() {
    return (
        <>
            <Helmet>
                <title> News Detail | Minimal UI </title>
            </Helmet>
            <NewsDetailView />
        </>
    );
}