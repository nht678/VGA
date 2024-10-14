
import axios from "axios";
import { BASE_API } from "./api";

const consultantService = {
    getConsultants: async (page, pageSize) => {
        const response = await BASE_API.get(`/consultants?page=${page}&pageSize=${pageSize}`);
        return response.data;
    },
    addConsultant: async (data) => {
        const response = await BASE_API.post(`/consultant`, data);
        return response.data;
    },
    updateConsultant: async (data) => {
        const response = await BASE_API.put(`/consultant/${data.id}`, data.formData);
        return response.data;
    },
    deleteConsultant: async (id) => {
        const response = await BASE_API.delete(`/consultant/${id}`);
        return response.data;
    },
};
export default consultantService;

