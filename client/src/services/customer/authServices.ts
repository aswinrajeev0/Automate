import { customerApi } from "../../api/customer.axios";
import { CustomerLoginData, CustomerRegisterData, ResetPasswordFormData } from "../../types/auth";

export const registerCustomer = async (data: CustomerRegisterData) => {
    try {
        const response = await customerApi.post('/sign-up', data);
        return response.data
    } catch (error: any) {
        throw error?.response?.data || "Registration failed"
    }
}

export const sendOtp = async (email: string) => {
    try {
        const response = await customerApi.post("/send-otp", { email });
        return response;
    } catch (error: any) {
        throw error?.response?.data || "Failed to send OTP";
    }
};

export const resetOtp = async (email: string) => {
    try {
        const response = await customerApi.post("/reset-password-otp", {email});
        return response;
    } catch (error: any) {
        throw error?.response?.data || "failed to send reset otp";
    }
}

export const verifyOtp = async (email: string, otp: string) => {
    try {
        const response = await customerApi.post("/verify-otp", { email, otp });
        return response;
    } catch (error: any) {
        throw error?.response?.data || "Failed in Verify-otp";
    }
};

export const loginCustomer = async (data:CustomerLoginData) => {
    try {
        const response = await customerApi.post("/login", data)
        return response.data;
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data || "Login failed"
    }
}

export const resetPassword = async(data: ResetPasswordFormData) => {
    try {
        const response = await customerApi.patch("/reset-password", data)
        return response.data;
    } catch (error: any) {
        throw error?.response?.data || "Password reset failed."
    }
}

export const customerlogout = async () => {
    try {
        const response = await customerApi.post("/logout")
        return response.data
    } catch (error: any) {
        throw error.response.data || "Logout failed"
    }
}