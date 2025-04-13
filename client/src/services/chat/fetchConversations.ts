import { customerApi } from "../../api/customer.axios";
import { workshopApi } from "../../api/workshop.axios";

export const fetchConversations = async (userType: string) => {
    try {
        let response;
        if(userType === "customer") {
            response = await customerApi.get("/get-conversations")
        }else{
            response = await workshopApi.get("/get-conversations")
        }
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
}