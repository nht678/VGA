import axios from "axios";

const universityService = {
    getUniversities: async (page, pageSize) => {
        const response = await axios.get(`https://localhost:7182/api/v1/universities?current-page=${page}&page-size=${pageSize}`);
        return response.data;
    }
};
export default universityService;