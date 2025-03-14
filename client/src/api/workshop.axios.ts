import axios from "axios";

export const workshopApi = axios.create({
    baseURL: import.meta.env.VITE_WORKSHOP_URL,
    withCredentials: true
})