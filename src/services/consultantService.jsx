
import axios from "axios";
import { BASE_API, TOKEN } from "./api";

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

        const response = await BASE_API.get(`/consultants`, {
            params,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        return response;
    },
    addConsultant: async (data) => {
        const response = await BASE_API.post(`/consultants`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },
    updateConsultant: async (id, data) => {
        const response = await BASE_API.put(`/consultant/${id}`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },
    deleteConsultant: async (id) => {
        const response = await BASE_API.delete(`/consultant/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },
};
export default consultantService;

