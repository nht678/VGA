import { BASE_API, TOKEN } from "./api";

const uploadfileService = {
    uploadFile: async (data) => {
        const response = await BASE_API.post(`/students/import`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response.data;
    },
};

export default uploadfileService;