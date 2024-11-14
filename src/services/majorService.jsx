import { BASE_API } from "./api"

const majorService = {
    getMajors: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/majors`, { params });
    },
    addMajor: (data) =>
        BASE_API.post(`/majors`, data)
    ,
    updateMajor: ({ formData, id }) =>
        BASE_API.put(`/major/${id}`, formData)
    ,
    deleteMajor: (id) =>
        BASE_API.delete(`/major/${id}`)
    ,
}
export default majorService
