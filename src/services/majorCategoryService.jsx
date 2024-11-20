import { BASE_API, TOKEN } from "./api";

const majorCategoryService = {
    getMajorCategories: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/major-categories`, {
            params,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
    },
    addMajorCategory: (data) =>
        BASE_API.post(`/major-categories`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    updateMajorCategory: (data) =>
        BASE_API.put(`/major-category/${data.id}`, data.formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    deleteMajorCategory: (id) =>
        BASE_API.delete(`/major-category/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
}

export default majorCategoryService