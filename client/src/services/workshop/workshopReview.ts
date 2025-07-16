import { AxiosError } from "axios";
import { workshopApi } from "../../api/workshop.axios"

export const getWorkshopReviews = async () => {
    try {
        const response = await workshopApi.get("/workshop-reviews");
        return response.data
    } catch (error: any) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch reviews!");
        }
    }
}