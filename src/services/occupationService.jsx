import { BASE_API } from "./api";

const occupationService = {
    getOccupations: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/occupations`, { params });
    },
    addOccupation: (data) =>
        BASE_API.post(`/occupation`, data)
    ,
    updateOccupation: (data) =>
        BASE_API.put(`/occupation/${data.id}`, data.formData)
    ,
    deleteOccupation: (id) =>
        BASE_API.delete(`/occupation/${id}`)
    ,
}
export default occupationService
