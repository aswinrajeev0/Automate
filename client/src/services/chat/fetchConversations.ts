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

export const fallbackUsers = async (userType: string) => {
    try {
        let response;
        if(userType === "customer") {
            response = await customerApi.get("/fallback-users")
        }else{
            response = await workshopApi.get("/fallback-user")
        }
        return response.data
    } catch (error: any) {
        throw error.response.data;
    }
}

export const startChat = async (userType: string, customerId: string, workshopId: string) => {
    try {
        let response;
        const body = {
            customerId,
            workshopId
        }
        if(userType === "customer"){
            response = await customerApi.post("/chat/start", body);
        }else{
            response = await workshopApi.post("/chat/start", body);
        }
        
        return response.data;
    } catch (error: any) {
        throw error.response.data
    }
}