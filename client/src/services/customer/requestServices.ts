import { AxiosError } from "axios";
import { customerApi } from "../../api/customer.axios";
import { ICarLiftdata, IMobileWorkshop } from "../../types/requests";

export const carLiftRequest = async (data: ICarLiftdata) => {
    try {
        const response = await customerApi.post("/car-lift", data)
        return response
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Request failed!");
        }
    }
}

export const mobileWorkshopRequest = async (data: IMobileWorkshop) => {
    try {
        const response = await customerApi.post("/mobile-workshop", data)
        return response
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Request failed!");
        }
    }
}

export const getAllRequests = async (page: number, limit: number) => {
    try {
        const response = await customerApi.get("/get-all-requests", {
            params: {
                page,
                limit
            }
        });
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch requests!");
        }
    }
}