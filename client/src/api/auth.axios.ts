import axios from "axios";

export const authApi = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL,
    withCredentials: true
})