import { AxiosError } from "axios";
import { workshopApi } from "../../api/workshop.axios";
import { ResetPasswordFormData, WorkshopLoginData, WorkshopRegisterData } from "../../types/auth";

export const registerWorkshop = async (data: WorkshopRegisterData) => {
    try {
        const response = await workshopApi.post('/sign-up', data);
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Registration failed!");
        }
    }
}

export const sendOtp = async (email: string) => {
    try {
        const response = await workshopApi.post("/send-otp", { email });
        return response;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to send OTP!");
        }
    }
};

export const verifyOtp = async (email: string, otp: string) => {
    try {
        const response = await workshopApi.post("/verify-otp", { email, otp });
        return response;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed in Verify-otp!");
        }
    }
};

export const workshopLogin = async (data: WorkshopLoginData) => {
    try {
        const response = await workshopApi.post("/login", data)
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Login failed!");
        }
    }
}

export const workshopResetOtp = async (email: string) => {
    try {
        const response = await workshopApi.post("/reset-password-otp", { email });
        return response;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("failed to send reset otp!");
        }
    }
}

export const workshopResetPassword = async (data: ResetPasswordFormData) => {
    try {
        const response = await workshopApi.patch("/reset-password", data)
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Password reset failed!");
        }
    }
}

export const workshopLogout = async () => {
    try {
        const response = await workshopApi.post("/logout");
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Logout failed!");
        }
    }
}