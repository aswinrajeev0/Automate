import { adminApi } from "../../api/admin.axios";

export const getAllCustomers = async ({
    page = 1,
    limit = 10,
    search = "",
}: {
    page: number;
    limit: number;
    search: string;
}) => {
    const response = await adminApi.get("/customers", {
        params: {
            page,
            limit,
            search,
        },
    });
    return response.data;
};

export const updateCustomerStatus = async (userId: string) => {
    try {
        const response = await adminApi.patch(`/customer-status/${userId}`, {});
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update status");
    }
};

export const getAllWorkshops = async ({
    page = 1,
    limit = 10,
    search = "",
}: {
    page: number;
    limit: number;
    search: string;
}) => {
    const response = await adminApi.get("/workshops", {
        params: {
            page,
            limit,
            search,
        },
    });
    return response.data;
}

export const updateWorkshopStatus = async (workshopId: string) => {
    try {
        const response = await adminApi.patch(`/workshop-status/${workshopId}`);
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message || "Failed to update status")
    }
}