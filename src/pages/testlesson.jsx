import { Helmet } from 'react-helmet-async';
import React from 'react';
import TestLessonView from 'src/sections/testLesson/view/testlesson-view';

export default function TestLesson() {
    return (
        <>
            <Helmet>
                <title>Test Lesson</title>
            </Helmet>
            <TestLessonView />
        </>
    );
}