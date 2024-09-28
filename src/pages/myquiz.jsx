import React from 'react';
import { Helmet } from 'react-helmet-async';
import MyQuizView from 'src/sections/myquiz/myquiz-view';

export default function MyQuizPage() {
    return (
        <>
            <Helmet>
                <title> MyQuiz | Minimal UI </title>
            </Helmet>

            <MyQuizView />
        </>
    );
}