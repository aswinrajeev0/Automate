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