import axios from 'axios';

// export const api = axios.create({
//     baseURL:"https://66dbc67347d749b72ac9f1d0.mockapi.io/hello"});
export const baseAPI = axios.create({
    baseURL: "https://65dc58f6e7edadead7ebb035.mockapi.io/"
});

// export const BASE_API = axios.create({
//     baseURL: "https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/"
// });

export const BASE_API = axios.create({
    baseURL: "https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/"
});

export const API_TRANSACTION = axios.create({
    baseURL: "https://localhost:7182/api/"
});


// export const API_CONSULTANT = axios.create({
//     baseURL: "https://localhost:7182/api/v1/"
// });

