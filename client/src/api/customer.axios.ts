import axios from 'axios'

export const customerApi = axios.create({
    baseURL: import.meta.env.VITE_CUSTOMER_URL,
    withCredentials: true
})