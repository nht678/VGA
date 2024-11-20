import { BASE_API, TOKEN } from "./api";

const entryLevelEducationService = {
    getEntryLevelEducations: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/entry-level-educations`, {
            params,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
    },
    addEntryLevelEducation: (data) =>
        BASE_API.post(`/entry-level-educations`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    updateEntryLevelEducation: ({ formData, id }) =>
        BASE_API.put(`/entry-level-education/${id}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    deleteEntryLevelEducation: (id) =>
        BASE_API.delete(`/entry-level-education/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
}
export default entryLevelEducationService