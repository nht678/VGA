import { BASE_API, TOKEN } from "./api";

const occupationService = {
    getOccupations: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/occupations`, {
            params,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
    },
    addOccupation: (data) =>
        BASE_API.post(`/occupations`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    updateOccupation: ({ formData, id }) =>
        BASE_API.put(`/occupation/${id}`, formData,
        )
    ,
    deleteOccupation: (id) =>
        BASE_API.delete(`/occupation/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
}
export default occupationService
