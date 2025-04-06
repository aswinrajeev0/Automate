import { customerApi } from "../../api/customer.axios"

export const getWallet = async () => {
    try {
        const response = await customerApi.get("/wallet")
        return response.data
    } catch (error: any) {
        throw error.response.data
    }
}

export const addMoney = async (amount: number) => {
    try {
        const response = await customerApi.post("/add-money",  {amount});
        return response.data
    } catch (error: any) {
        throw error.response.data
    }
}