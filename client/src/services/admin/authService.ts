import { AxiosError } from "axios";
import { adminApi } from "../../api/admin.axios";
import { AdminLoginData } from "../../types/auth";

export const adminLogin = async (data: AdminLoginData) => {
    try {
        const response = await adminApi.post('/login', data);
        return response
    } catch (error: any) {
        console.log(error)
        throw error.response?.data;
    }
}

export const adminLogout = async () => {
    try {
        const response = await adminApi.post("/logout");
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to update status");
        }
    }
}