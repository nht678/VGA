import axios from 'axios';

export const apiUser = axios.create({
    baseURL:"https://66dbc67347d749b72ac9f1d0.mockapi.io/users"});