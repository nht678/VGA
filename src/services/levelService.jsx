import axios from "axios";
import { BASE_API } from "./api";

const levelService = {
    getLevels: async ({ page, pagesize, search }) => {
        const response = await BASE_API.get(`consultant-levels`, {
            params: {
                'current-page': page,
                'page-size': pagesize,
                'name': search || '',
            },
        });
        return response.data;
    },
    addLevel: async (data) => {
        const response = await BASE_API.post(`consultant-levels`, data);
        return response.data;
    },

    updateLevel: async ({ formData, id }) => {
        const response = await BASE_API.put(`consultant-levels/${id}`, formData);
        return response.data;
    },
    deleteLevel: async (id) => {
        const response = await BASE_API.delete(`consultant-levels/${id}`);
        return response.data;
    },
};
export default levelService;