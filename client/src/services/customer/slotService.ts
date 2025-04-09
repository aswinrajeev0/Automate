import { customerApi } from "../../api/customer.axios";
import { BookSlot } from "../../hooks/customer/useSlotBooking";

export const bookedSlots = async (workshopId: string, type: string) => {
    try {
        const response = await customerApi.get(`/booked-slots/${workshopId}`,{
            params:{
                type: type
            }
        })
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export const bookSlot = async (data: BookSlot) => {
    try {
        const response = await customerApi.post("/book-slot", data);
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export const cancelSlot = async (bookingId: string) => {
    try {
        const response = await customerApi.patch(`/cancel-slot/${bookingId}`);
        return response.data;
    } catch (error: any) {
        return error.response.data
    }
}

export const isSlotAvailable = async (data: {date: Date; time: string, endTime: string}) => {
    try {
        const response = await customerApi.get("/is-slot-available", {
            params: data
        })
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const allUserBookings = async (page: number, limit: number) => {
    try {
        const response = await customerApi.get("/all-user-bookings",{
            params: {
                page,
                limit
            }
        });
        return response.data
    } catch (error: any) {
        throw error.response.data
    }
}