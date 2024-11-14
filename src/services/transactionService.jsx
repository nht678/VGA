import { BASE_API } from "./api";


const transactionService = {
    getTransaction: async ({ page, pageSize, transactionType, accountId }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };

        if (transactionType) {
            params['transaction-type'] = transactionType;
        }
        if (accountId) {
            params.account_id = accountId;
        }
        const response = await BASE_API.get(`/transactions`, { params });

        console.log(response.data);

        return response.data;
    },

    createDistribution: async (data) => {
        const response = await BASE_API.put(`/wallet/distribution`, data);
        debugger
        return response.data;
    }
}
export default transactionService;

// BASE_API.put('https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/wallet/distribution', data)