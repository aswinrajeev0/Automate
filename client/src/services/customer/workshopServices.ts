import { customerApi } from "../../api/customer.axios"
import { IReveiwSubmitData, WorkshopDetailsResponse } from "../../hooks/customer/useWorkshops";


export const workshopDetails = async (id: string): Promise<WorkshopDetailsResponse> => {
    try {
        const response = await customerApi.get(`/workshop-details/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
}

export const submitReview = async (data: IReveiwSubmitData) => {
    try {
        const response = await customerApi.post("/submit-review", data);
        return response
    } catch (error: any) {
        throw error.response.data
    }
}