import React from 'react';
import { Helmet } from 'react-helmet-async';
import QuizDetailView from 'src/sections/quizdetail/quizdetail-view';


export default function QuizDetail() {
    return (
        <>
            <Helmet>
                <title> quizdetail | Minimal UI </title>
            </Helmet>
            <QuizDetailView />
        </>
    );
}