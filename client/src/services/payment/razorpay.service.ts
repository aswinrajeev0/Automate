import { AxiosError } from "axios";
import { customerApi } from "../../api/customer.axios"

export const createOrder = async (orderCreationData: { amount: number, currency: string }) => {
    try {
        const response = await customerApi.post("/create-order", orderCreationData)
        return response.data
    } catch (error: any) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to create order!");
        }
    }
}

export const verifyPayment = async (verificationData: {
    order_id: string;
    payment_id: string;
    razorpay_signature: string;
}) => {
    try {
        const response = await customerApi.post("/verify-payment", verificationData);
        return response.data
    } catch (error: any) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to verify payment!");
        }
    }
}