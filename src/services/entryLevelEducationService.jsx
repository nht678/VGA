import { BASE_API } from "./api";

const entryLevelEducationService = {
    getEntryLevelEducations: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/entry-level-educations`, { params });
    },
    addEntryLevelEducation: (data) =>
        BASE_API.post(`/entry-level-educations`, data)
    ,
    updateEntryLevelEducation: ({ formData, id }) =>
        BASE_API.put(`/entry-level-education/${id}`, formData)
    ,
    deleteEntryLevelEducation: (id) =>
        BASE_API.delete(`/entry-level-education/${id}`)
    ,
}
export default entryLevelEducationService