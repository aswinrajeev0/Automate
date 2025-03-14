import { workshopApi } from "../../api/workshop.axios";
import { WorkshopLoginData, WorkshopRegisterData } from "../../types/auth";

export const registerWorkshop = async (data: WorkshopRegisterData) => {
    try {
        const response = await workshopApi.post('/sign-up', data);
        return response.data
    } catch (error: any) {
        throw error.response?.data || "Registration failed"
    }
}

export const sendOtp = async (email: string) => {
    try {
        const response = await workshopApi.post("/send-otp", { email });
        return response;
    } catch (error: any) {
        throw error.response?.data || "Failed to send OTP";
    }
};

export const verifyOtp = async (email: string, otp: string) => {
    try {
        const response = await workshopApi.post("/verify-otp", { email, otp });
        return response;
    } catch (error: any) {
        throw error.response?.data || "Failed in Verify-otp";
    }
};

export const workshopLogin = async (data:WorkshopLoginData) => {
    try {
        const response = await workshopApi.post("/login", data)
        return response.data;
    } catch (error: any) {
        throw error?.response.data || "Login failed"
    }
}