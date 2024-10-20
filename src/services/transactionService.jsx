import { API_TRANSACTION } from "./api";


const transactionService = {
    getTransaction: async ({ page, pageSize, transactionType }) => {
        const response = await API_TRANSACTION.get(`/Transaction`, {
            params: {
                'current-page': page,
                'page-size': pageSize,
                'transaction-type': transactionType,
            },
        }
        );
        console.log(response.data);

        return response.data;
    },

};
export default transactionService;