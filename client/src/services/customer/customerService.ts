import { customerApi } from "../../api/customer.axios";

export const getFeaturedWorkshops = async () => {
    const response = await customerApi.get("/workshops/featured");
    return response.data;
}