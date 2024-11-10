import { BASE_API } from "./api";

const workSkillService = {
    getWorkSkills: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/work-skills`, { params });
    },
    addWorkSkill: (data) =>
        BASE_API.post(`/work-skill`, data)
    ,
    updateWorkSkill: (data) =>
        BASE_API.put(`/work-skill/${data.id}`, data.formData)
    ,
    deleteWorkSkill: (id) =>
        BASE_API.delete(`/work-skill/${id}`)
    ,
}
export default workSkillService
