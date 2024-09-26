
import React from 'react';
import { Helmet } from 'react-helmet-async';
import EventQuizView from 'src/sections/eventquiz/eventquiz-view';

export default function EventQuiz() {
    return (
        <>
            <Helmet>
                <title> Event Quiz | Minimal UI </title>
            </Helmet>

            <EventQuizView />
        </>
    );
}