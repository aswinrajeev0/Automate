import axios from "axios";

export const adminApi = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_URL,
    withCredentials: true
})