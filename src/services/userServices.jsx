import axios from 'axios';

// export const apiUser = axios.create({
//     baseURL:"https://66dbc67347d749b72ac9f1d0.mockapi.io/users"});
// api test news
// export const baseAPI = axios.create({
//     baseURL: "https://65dc58f6e7edadead7ebb035.mockapi.io/"
// });


export const apiUser = axios.create({
    baseURL: "https://localhost:7182/api/v1/students"
});
export const apiUserUpdate = axios.create({
    baseURL: "https://localhost:7182/api/v1/student"
});

export const apiuploadFile = axios.create({
    baseURL: "https://localhost:7182/api/v1/students/import"
});
