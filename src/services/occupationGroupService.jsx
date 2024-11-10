import { BASE_API } from "./api";

const occupationGroupService = {
    getOccupationGroups: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/occupational-groups`, { params });
    },
    addOccupationGroup: (data) =>
        BASE_API.post(`/occupational-group`, data)
    ,
    updateOccupationGroup: (data) =>
        BASE_API.put(`/occupational-group/${data.id}`, data.formData)
    ,
    deleteOccupationGroup: (id) =>
        BASE_API.delete(`/occupational-group/${id}`)
    ,
}
export default occupationGroupService
