import axios from "axios";
import { BASE_API } from "./api";

const levelService = {
    getLevels: async () => {
        const response = await BASE_API.get(`consultant-levels`);
        return response.data;
    },
    addLevel: async (data) => {
        const response = await BASE_API.post(`/level`, data);
        return response.data;
    },
    updateLevel: async (data) => {
        const response = await BASE_API.put(`/level/${data.id}`, data.formData);
        return response.data;
    },
    deleteLevel: async (id) => {
        const response = await BASE_API.delete(`/level/${id}`);
        return response.data;
    },
};
export default levelService;