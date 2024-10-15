import { BASE_API } from "./api";

const uploadfileService = {
    uploadFile: async (data) => {
        const response = await BASE_API.post(`/students/import`, data);
        return response.data;
    },
};

export default uploadfileService;