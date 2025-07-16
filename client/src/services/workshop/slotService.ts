import { AxiosError } from "axios";
import { workshopApi } from "../../api/workshop.axios";
import { ITimeSlot } from "../../types/slots";

export const allSlots = async () => {
    try {
        const response = await workshopApi.get("/all-slots");
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch slots!");
        }
    }
}

export const createSlots = async (data: ITimeSlot[]) => {
    try {
        const response = await workshopApi.post("/create-slots", {data});
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to create slots!");
        }
    }
}

export const deleteSlot = async (slotId: string) => {
    try {
        const response = await workshopApi.delete("/delete-slot",{
            params: {
                slotId
            }
        })

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to delete slot!");
        }
    }
}

export const toggleAvailability = async(slotId: string, isAvailable: boolean) => {
    try {
        const response = await workshopApi.patch("/toggle-slot-availabilty",{
            slotId,
            isAvailable
        })
        return response.data;
    } catch (error) {
       const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to toggle slot status!");
        }
    }
}