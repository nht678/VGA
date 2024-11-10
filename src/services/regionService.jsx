import { BASE_API } from "./api";

const regionService = {
    getRegions: async () => {
        const response = await BASE_API.get(`/regions`);
        return response.data;
    },

};
export default regionService;