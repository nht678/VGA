import { BASE_API, TOKEN } from "./api";

const highschoolService = {
    getHighSchools: async ({ page, pageSize, search }) => {
        const response = await BASE_API.get(`/high-schools`, {
            params: {
                'current-page': page,
                'page-size': pageSize,
                name: search || '',
            },
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },

        });
        return response.data;
    },
    addHighSchool: (data) =>
        BASE_API.post(`/high-school`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    updateHighSchool: ({ id, formData }) =>
        BASE_API.put(`/high-school/${id}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    deleteHighSchool: async (id) => {
        const response = await BASE_API.delete(`/high-school/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },
};
export default highschoolService;