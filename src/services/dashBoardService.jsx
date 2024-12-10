import { BASE_API, TOKEN } from "./api";

const dashBoardService = {
    getDashBoard: async () => {
        const response = await BASE_API.get(`/dashboard`);
        return response;
    },
    getDashBoardUni: async ({ userId }) => {
        const response = await BASE_API.get(`/uni/dashboard/${userId}`);
        return response;
    },
};

export default dashBoardService;