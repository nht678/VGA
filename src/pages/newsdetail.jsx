import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from 'src/pages/header';
import NewsDetailView from 'src/sections/newsdetail/newsdetail-view';
import Footer from 'src/sections/footer/footer';

export default function NewsDetail() {
    return (
        <>
            {/* <Helmet>
                <title> News Detail | Minimal UI </title>
            </Helmet> */}
            <Header />
            <NewsDetailView />
            <Footer />
        </>
    );
}