import { BASE_API, TOKEN } from "./api";

const occupationGroupService = {
    getOccupationGroups: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/occupational-groups`, {
            params,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
    },
    addOccupationGroup: (data) =>
        BASE_API.post(`/occupational-groups`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    updateOccupationGroup: (data) =>
        BASE_API.put(`/occupational-group/${data.id}`, data.formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    deleteOccupationGroup: (id) =>
        BASE_API.delete(`/occupational-group/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
}
export default occupationGroupService
