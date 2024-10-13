
import axios from "axios";

const consultantService = {
    getConsultants: async (page, pageSize) => {
        const response = await axios.get(`https://localhost:7182/api/v1/consultants?current-page=${page}&page-size=${pageSize}`);
        return response.data;
    }
};
export default consultantService;

