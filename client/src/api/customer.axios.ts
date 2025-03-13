import axios from 'axios'

console.log(import.meta.env.VITE_CUSTOMER_URL)

export const customerApi = axios.create({
    baseURL: import.meta.env.VITE_CUSTOMER_URL,
    withCredentials: true
})