import axios from 'axios';
import { BASE_API } from './api';

const userServices = {
    getUsers: async ({ page, pageSize, search, schoolYears }) => {
        const response = await BASE_API.get(`/students`, {
            params: {
                'current-page': page,
                'page-size': pageSize,
                name: search || '',
                'school-years': schoolYears || '',
            },
        });
        return response.data;
    },
    addUser: async (data) => {
        const response = await BASE_API.post(`/student`, data);
        return response.data;
    },
    updateUser: async (data, userId) => {
        const response = await BASE_API.put(`/student/${userId}`, data);
        return response.data;
    },
    deleteUser: async (id) => {
        const response = await BASE_API.delete(`/student/${id}`);
        return response.data;
    },
};

export default userServices;