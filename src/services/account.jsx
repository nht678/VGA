import axios from "axios";

export const baseAPI = axios.create({
    baseURL: "https://localhost:7182/api/v1/"
});

