import axios from 'axios';

// export const apiUser = axios.create({
//     baseURL:"https://66dbc67347d749b72ac9f1d0.mockapi.io/users"});
// api test news
export const baseAPI = axios.create({
    baseURL: "https://65dc58f6e7edadead7ebb035.mockapi.io/"
});


export const apiUser = axios.create({
    baseURL: "https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/students?current"
});

