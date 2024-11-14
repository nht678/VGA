import { BASE_API } from "./api";

const walletService = {
    getWallet: async ({ page, pageSize }) => {
        const response = await BASE_API.get(`/wallet/distribution?page=${page}&pageSize=${pageSize}`);
        return response.data
    }
    ,
    getWalletbyId: async ({ id }) =>
        BASE_API.get(`/wallet/${id}`)
    ,
    updateWallet: async ({ id, data }) => {
        const response = await BASE_API.put(`/wallet/distribution/${id}`, data);
        return response.data;
    },
};

export default walletService;