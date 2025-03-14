import { customerApi } from "../../api/customer.axios";
import { CustomerLoginData, CustomerRegisterData } from "../../types/auth";

export const registerCustomer = async (data: CustomerRegisterData) => {
    try {
        const response = await customerApi.post('/sign-up', data);
        return response.data
    } catch (error: any) {
        throw error.response?.data || "Registration failed"
    }
}

export const sendOtp = async (email: string) => {
    try {
        const response = await customerApi.post("/send-otp", { email });
        return response;
    } catch (error: any) {
        throw error.response?.data || "Failed to send OTP";
    }
};

export const verifyOtp = async (email: string, otp: string) => {
    try {
        const response = await customerApi.post("/verify-otp", { email, otp });
        return response;
    } catch (error: any) {
        throw error.response?.data || "Failed in Verify-otp";
    }
};

export const loginCustomer = async (data:CustomerLoginData) => {
    try {
        const response = await customerApi.post("/login", data)
        return response.data;
    } catch (error: any) {
        throw error?.response.data || "Login failed"
    }
}