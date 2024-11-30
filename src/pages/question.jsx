import { Helmet } from 'react-helmet-async';
import React from 'react';
import QuestionView from 'src/sections/question/view/question-view';

export default function Question() {
    return (
        <>
            <Helmet>
                <title>Câu hỏi</title>
            </Helmet>
            <QuestionView />
        </>
    );
}