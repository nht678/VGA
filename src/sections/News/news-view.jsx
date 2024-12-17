
import * as React from 'react';
import { useEffect, useState } from 'react';
// useSelector 
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { actGetNewsAsync } from '../../store/NewsForUniversity/action';




export default function NewsView() {

    // useSelector
    const { news, total = 0, success } = useSelector((state) => state.newsForUniversityReducer);
    let userId = localStorage.getItem('userId');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actGetNewsAsync({}));
    }, [success]);

    return (

        <>
            <div className="bg-white py-24 sm:py-32 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Các tin tức nổi bật</h2>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {news?.map((News) => (
                            <Link to={`/newsdetail/${News.id}`} key={News.id} >
                                <article key={News.id} className="flex max-w-xl flex-col items-start justify-between">
                                    <div className="flex items-center gap-x-4 text-xs">
                                        <time dateTime={News?.createdAt} className="text-gray-500">
                                            {new Date(News?.createdAt).toLocaleDateString()}
                                        </time>
                                    </div>
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <a href={News.title}>
                                                <span className="absolute inset-0" />
                                                {News?.title.length > 70 ? `${News?.title.slice(0, 70)} ...` : News?.title}
                                            </a>
                                        </h3>
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{News.content?.length > 150 ? `${News?.content.slice(0, 150)} ...` : News?.content}</p>
                                    </div>
                                    <div className="relative mt-8 flex items-center gap-x-4">
                                        <img
                                            alt=""
                                            src={News?.universityImageUrl || "/default-image.jpg"}
                                            className="h-10 w-10 rounded-full bg-gray-50"
                                        />
                                        <div className="text-sm leading-6">
                                            <p className="font-semibold text-gray-900">
                                                <a>
                                                    <span className="absolute inset-0" />
                                                    {News?.universityName}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
}
