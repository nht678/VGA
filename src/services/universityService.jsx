import axios from "axios";
import { BASE_API, TOKEN } from "./api";


const universityService = {
    getUniversities: async ({ page, search, pageSize }) => {
        // const response = await BASE_API.get(`/universities?page=${page}&pageSize=${pageSize}`);
        const response = await BASE_API.get(`/universities`, {
            params: {
                'current-page': page,
                'page-size': pageSize,
                'name': search || '',
            },
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }
        );
        console.log('response', response);
        return response.data;
    },
    addUniversity: (data) =>
        BASE_API.post(
            `/university`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
    ,
    updateUniversity: (data) =>
        BASE_API.put(`/university/${data.id}`, data.formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    deleteUniversity: (id) =>
        BASE_API.delete(`/university/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
};
export default universityService;