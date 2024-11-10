import { BASE_API } from "./api";

const newsForUniversityService = {
    getNewsForUniversity: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
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
}
export default newsForUniversityService