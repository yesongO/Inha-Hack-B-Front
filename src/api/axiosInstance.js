// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE, // .env에 정의된 API 주소
    withCredentials: false, 
});

export default axiosInstance;