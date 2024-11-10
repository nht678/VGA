import { BASE_API } from "./api";

const majorCategoryService = {
    getMajorCategories: ({ page, pageSize, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        if (search) {
            params.name = search;
        }
        return BASE_API.get(`/major-categories`, { params });
    },
    addMajorCategory: (data) =>
        BASE_API.post(`/major-category`, data)
    ,
    updateMajorCategory: (data) =>
        BASE_API.put(`/major-category/${data.id}`, data.formData)
    ,
    deleteMajorCategory: (id) =>
        BASE_API.delete(`/major-category/${id}`)
    ,
}

export default majorCategoryService