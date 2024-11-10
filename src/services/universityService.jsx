import axios from "axios";
import { BASE_API } from "./api";

const universityService = {
    getUniversities: async ({ page, search, pageSize }) => {
        // const response = await BASE_API.get(`/universities?page=${page}&pageSize=${pageSize}`);
        const response = await BASE_API.get(`/universities`, {
            params: {
                'current-page': page,
                'page-size': pageSize,
                'name': search || '',
            },
        });
        console.log('response', response);
        return response.data;
    },
    addUniversity: (data) =>
        BASE_API.post(`/university`, data)
    ,
    updateUniversity: (data) =>
        BASE_API.put(`/university/${data.id}`, data.formData)
    ,
    deleteUniversity: (id) =>
        BASE_API.delete(`/university/${id}`)
    ,

};
export default universityService;