import { BASE_API } from "./api";

const highschoolService = {
    getHighSchools: async ({ page, pageSize, search }) => {
        const response = await BASE_API.get(`/high-schools`, {
            params: {
                'current-page': page,
                'page-size': pageSize,
                name: search || '',
            },
        });
        return response.data;
    },
    addHighSchool: (data) =>
        BASE_API.post(`/high-school`, data)
    ,
    updateHighSchool: ({ id, formData }) =>
        BASE_API.put(`/high-school/${id}`, formData)
    ,
    deleteHighSchool: async (id) => {
        BASE_API.delete(`/high-school/${id}`);
    },
};
export default highschoolService;