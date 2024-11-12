import { BASE_API } from "./api";

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
        return BASE_API.get(`/news`, { params });
    },
    addNewsForUniversity: (data) =>
        BASE_API.post(`/news`, data)
    ,
    updateNewsForUniversity: (data) =>
        BASE_API.put(`/news/${data.id}`, data.formData)
    ,
    deleteNewsForUniversity: (id) =>
        BASE_API.delete(`/news/${id}`)
    ,
    updateNewsContentForUniversity: ({ id, formData }) =>
        BASE_API.put(`/news/${id}/`, formData)
    ,
    updateNewsImageForUniversity: ({ id, formData }) =>
        BASE_API.put(`/news/${id}/image`, formData)
    ,
    createNewsImageForUniversity: ({ id, imageData }) =>
        BASE_API.post(`/image-news/?NewsId=${id}`, imageData)
    ,
    deleteNewsImageForUniversity: (id) =>
        BASE_API.delete(`/image-news/${id}`)
}
export default newsForUniversityService