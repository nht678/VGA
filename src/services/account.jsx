import axios from "axios";

export const baseAPI = axios.create({
    baseURL: "https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/Account"
});