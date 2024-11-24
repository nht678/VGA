import axios from "axios";
import { BASE_API, TOKEN } from "./api";

const levelService = {
    getLevels: async ({ page, pageSize, search }) => {
        const response = await BASE_API.get(`consultant-levels`, {
            params: {
                'current-page': page,
                'page-size': pageSize,
                'name': search || '',
            },
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        return response;
    },
    addLevel: async (data) => {
        const response = await BASE_API.post(`consultant-levels`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },

    updateLevel: async ({ formData, id }) => {
        const response = await BASE_API.put(`consultant-level/${id}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },
    deleteLevel: async (id) => {
        const response = await BASE_API.delete(`consultant-level/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },
};
export default levelService;