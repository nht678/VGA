import { BASE_API, TOKEN } from "./api"

const majorService = {
    getMajors: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/majors`, {
            params,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
    },
    addMajor: (data) =>
        BASE_API.post(`/majors`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    updateMajor: ({ formData, id }) =>
        BASE_API.put(`/major/${id}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    deleteMajor: (id) =>
        BASE_API.delete(`/major/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
}
export default majorService
