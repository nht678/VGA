import { BASE_API, TOKEN } from "./api";

const regionService = {
    getRegions: async () => {
        const response = await BASE_API.get(`/regions`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },

};
export default regionService;