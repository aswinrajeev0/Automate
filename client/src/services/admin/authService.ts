import { adminApi } from "../../api/admin.axios";
import { AdminLoginData } from "../../types/auth";

export const adminLogin = async (data: AdminLoginData) => {
    try {
        const response = await adminApi.post('/login', data);
        return response
    } catch (error: any) {
        throw error.response.data;
    }
}