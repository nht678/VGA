import { BASE_API, TOKEN } from "./api";


const transactionService = {
    getTransaction: async ({ page, pageSize, transactionType, accountId, search }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
            'sort-by-date-time': true,
            'descending': true
        };

        if (transactionType) {
            params['transaction-type'] = transactionType;
        }
        if (accountId) {
            params.account_id = accountId;
        }
        if (search) {
            params.search = search;
        }
        const response = await BASE_API.get(`/transactions`, {
            params,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });

        console.log(response.data);

        return response.data;
    },

    createDistribution: async (data) => {
        const response = await BASE_API.put(`/wallet/distribution`, data,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },
    createDistributionofAdminUniAsync: async ({ formData, gold }) => {
        const response = await BASE_API.put(`wallet/tranferring-gold?gold=${gold}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        return response;
    },
    requestWithdrawal: async (id, data) => {
        const response = await BASE_API.put(`/transaction/process/${id}`, data,

        );
        return response;
    }
}
export default transactionService;

// BASE_API.put('https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/wallet/distribution', data)