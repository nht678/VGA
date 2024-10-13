import axios from "axios";

export const apiHighSchool = axios.create({
    baseURL: 'https://localhost:7182/api/v1/'
});
