
import axios from "axios";

export const apiRegion = axios.create({
    baseURL: 'https://localhost:7182/api/v1/regions'
});
