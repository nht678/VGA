import axios from "axios";
import { BASE_API } from "./api";

const universityService = {
    getUniversities: async (page, pageSize) => {
        const response = await BASE_API.get(`/universities?page=${page}&pageSize=${pageSize}`);
        return response.data;
    },
    addUniversity: async (data) => {
        const response = await BASE_API.post(`/university`, data);
        return response.data;
    },
    updateUniversity: async (data) => {
        const response = await BASE_API.put(`/university/${data.id}`, data.formData);
        return response.data;
    },
    deleteUniversity: async (id) => {
        const response = await BASE_API.delete(`/university/${id}`);
        return response.data;
    },

};
export default universityService;