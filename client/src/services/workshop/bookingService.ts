import { AxiosError } from "axios";
import { workshopApi } from "../../api/workshop.axios"

export const getAllWorkshopBookings = async (page: number, limit: number, searchTerm: string, statusFilter: string) => {
    try {
        const response = await workshopApi.get("/all-workshop-bookings",{
            params: {
                page,
                limit,
                searchTerm,
                statusFilter
            }
        })
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch bookings!");
        }
    }
}

export const cancelBooking = async (bookingId: string) => {
    try {
        const response = await workshopApi.patch("/cancel-booking",{
            bookingId
        })
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to cancel booking!");
        }
    }
}

export const changeWorkshopStatus = async (bookingId: string, status: string) => {
    try {
        const response = await workshopApi.patch("/change-booking-status",{
            bookingId,
            status
        })
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to change booking status!");
        }
    }
}