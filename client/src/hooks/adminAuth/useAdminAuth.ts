import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../../services/admin/authService";
import { AdminLoginData } from "../../types/auth";

export const useAdminLogin = () => {
    return useMutation({
        mutationFn: (data: AdminLoginData) => adminLogin(data),
        onError: (error: Error) => {
            console.error(error)
        }
    })
}