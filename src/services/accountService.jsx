import axios from "axios";
import { BASE_API } from "./api";

const accountService = {
    login: async (data) => {
        const response = await BASE_API.post('/login', data);
        return response.data;
    },
    logout: async (id, token) => {
        const response = await BASE_API.post(`/logout/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    },
    register: async (data) => {
        const response = await BASE_API.post('/register', data);
        return response.data;
    },
    forgotPassword: async (data) => {
        const response = await BASE_API.post('/forgot-password', data);
        return response.data;
    },
    resetPassword: async (data) => {
        const response = await BASE_API.post('/reset-password', data);
        return response.data;
    },
};

export default accountService;
