import axios from "axios";
import { BASE_API } from "./api";

const walletService = {

    updateWallet: async ({ id, data }) => {
        const response = await BASE_API.put(`/wallet/distribution/${id}`, data);
        return response.data;
    },

};

export default walletService;