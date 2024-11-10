
import axios from "axios";
import { BASE_API } from "./api";

const consultantService = {
    getConsultants: async ({ page, pageSize, search, level }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };

        // Chỉ thêm các tham số nếu chúng có giá trị
        if (search) {
            params.name = search;
        }

        if (level) {
            params['consultant-level-id'] = level;
        }

        const response = await BASE_API.get(`/consultants`, { params });
        return response.data;
    },
    addConsultant: async (data) => {
        const response = await BASE_API.post(`/consultants`, data);
        return response.data;
    },
    updateConsultant: async (id, data) => {
        const response = await BASE_API.put(`/consultant/${id}`, data);
        return response.data;
    },
    deleteConsultant: async (id) => {
        const response = await BASE_API.delete(`/consultant/${id}`);
        return response.data;
    },
};
export default consultantService;

