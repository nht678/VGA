import { BASE_API, TOKEN } from "./api";

const walletService = {
    getWallet: async ({ page, pageSize }) => {
        const response = await BASE_API.get(`/wallet/distribution?page=${page}&pageSize=${pageSize}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response
    }
    ,
    getWalletbyId: async ({ id }) =>
        BASE_API.get(`/wallet/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        )
    ,
    updateWallet: async ({ id, data }) => {
        const response = await BASE_API.put(`/wallet/distribution/${id}`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },
};

export default walletService;