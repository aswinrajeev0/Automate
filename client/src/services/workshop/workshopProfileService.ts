import { AxiosError } from "axios";
import { workshopApi } from "../../api/workshop.axios";
import { IWorkshopAddress } from "../../hooks/workshop/useWorkshopProfile";
import { ChangePasswordData, WorkshopAddressEditFormData, WorkshopEditFormData } from "../../types/auth";

export const updateWorkshop = async (data: WorkshopEditFormData) => {
    try {
        const response = await workshopApi.put("/update-workshop", data);
        return response;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to update profile!");
        }
    }
}

export const workshopDelete = async () => {
    try {
        const response = await workshopApi.delete("/delete-workshop");
        return response;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to delete workshop!");
        }
    }
}

export const getWorkshopAddress = async (): Promise<IWorkshopAddress> => {
    try {
        const response = await workshopApi.get("/workshop-address");
        return response.data.address
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch address!");
        }
    }
}

export const editWorkshopAddress = async (data: WorkshopAddressEditFormData) => {
    try {
        const response = await workshopApi.put("/edit-address", data);
        return response
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to edit address!");
        }
    }
}

export const changeWorkshopPassword = async (data: ChangePasswordData) => {
    try {
        const response = await workshopApi.patch("/change-password", data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to change password!");
        }
    }
}