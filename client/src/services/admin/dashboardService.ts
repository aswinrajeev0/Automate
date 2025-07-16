import { AxiosError } from "axios";
import { adminApi } from "../../api/admin.axios"

export const customerGrowth = async (filter: string) => {
    try {
        const response = await adminApi.get("/customer-growth",{
            params: {
                filter
            }
        })

        return response.data
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch customer growth!");
        }
    }
}

export const dashboardData = async () => {
    try {
        const response = await adminApi.get("/dashboard-data")
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch dashboard data!");
        }
    }
}

export const workshopGrowth = async (filter: string) => {
    try {
        const response = await adminApi.get("/workshop-growth",{
            params: {
                filter
            }
        })

        return response.data
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch workshop growth!");
        }
    }
}