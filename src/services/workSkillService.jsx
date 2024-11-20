import { BASE_API, TOKEN } from "./api";

const workSkillService = {
    getWorkSkills: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/work-skills`, {
            params,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
    },
    addWorkSkill: (data) =>
        BASE_API.post(`/work-skills`, data)
    ,
    updateWorkSkill: (data) =>
        BASE_API.put(`/work-skill/${data.id}`, data.formData)
    ,
    deleteWorkSkill: (id) =>
        BASE_API.delete(`/work-skill/${id}`)
    ,
}
export default workSkillService
