import axios from 'axios';
import { BASE_API, TOKEN } from './api';

const userServices = {
    getUsers: async ({ page, pageSize, search, highSchoolId, schoolYears }) => {
        console.log('TOKEN', TOKEN);
        const response = await BASE_API.get(`/students`, {
            params: {
                'current-page': page,
                'page-size': pageSize,
                name: search || '',
                'highschool-id': highSchoolId || '',
                'school-years': schoolYears || '',
            },
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        return response;
    },
    addUser: async (data) => {
        // return BASE_API.post(`/student`, data);
        const response = await BASE_API.post(`/student`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;

    },
    updateUser: async (data, userId) => {
        const response = await BASE_API.put(`/student/${userId}`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },
    deleteUser: async (id) => {
        const response = await BASE_API.delete(`/student/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },
    banAccount: async ({ changeStatus, accountId }) => {
        const response = await BASE_API.put(`/accounts/${accountId}`, null, {
            params: {
                status: changeStatus,
            },
        });
        return response;

    }
};

export default userServices;