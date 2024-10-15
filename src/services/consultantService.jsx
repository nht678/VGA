
import axios from "axios";
import { BASE_API } from "./api";

const consultantService = {
    getConsultants: async (page, pageSize) => {
        const response = await BASE_API.get(`/consultants?page=${page}&pageSize=${pageSize}`);
        return response.data;
    },
    addConsultant: async (data) => {
        const response = await BASE_API.post(`/consultants`, data);
        return response.data;
    },
    updateConsultant: async (id, data) => {
        const response = await BASE_API.put(`/consultants/${id}`, data);
        return response.data;
    },
    deleteConsultant: async (id) => {
        const response = await BASE_API.delete(`/consultants/${id}`);
        return response.data;
    },
};
export default consultantService;

