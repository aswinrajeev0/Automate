import { AxiosError } from "axios";
import { workshopApi } from "../../api/workshop.axios";

export const dashboardData = async () => {
    try {
        const response = await workshopApi.get("/dashboard");
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch dashboard!");
        }
    }
}

export const getGrowtChartData = async (timeFrame: string) => {
    try {
        const response = await workshopApi.get("/growth-chart-data", {
            params: {
                timeFrame
            }
        })

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch growth data!");
        }
    }
}

export const getEarningsChartData = async (timeFrame: string) => {
    try {
        const response = await workshopApi.get("/earnings-chart-data", {
            params: {
                timeFrame
            }
        })

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch earnings data!");
        }
    }
}