import axios from 'axios';

const BASE_API = axios.create({
    baseURL: "https://vgacareerguidance.id.vn/api/v1",
});

// Thêm Interceptor để tự động thêm token
BASE_API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Lấy token mới nhất
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export { BASE_API };
export const TOKEN = localStorage.getItem('token');
console.log('TOKENINAPI', TOKEN);


