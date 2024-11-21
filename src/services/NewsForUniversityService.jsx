import { BASE_API, TOKEN } from "./api";

const newsForUniversityService = {
    getNewsForUniversity: ({ page, pageSize, search, universityid }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
            'university-id': universityid,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/news`, {
            params,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
    },
    getNewsByIdForUniversity: (id) =>
        BASE_API.get(`/news/${id}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        })
    ,
    addNewsForUniversity: (data) =>
        BASE_API.post(`/news`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    updateNewsForUniversity: (data) =>
        BASE_API.put(`/news/${data.id}`, data.formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    deleteNewsForUniversity: (id) =>
        BASE_API.delete(`/news/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    updateNewsContentForUniversity: ({ id, formData }) =>
        BASE_API.put(`/news/${id}/`, formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    updateNewsImageForUniversity: ({ id, formData }) =>
        BASE_API.put(`/news/${id}/image`, formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    createNewsImageForUniversity: ({ id, imageData }) =>
        BASE_API.post(`/image-news/?NewsId=${id}`, imageData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    deleteNewsImageForUniversity: (id) =>
        BASE_API.delete(`/image-news/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
}
export default newsForUniversityService