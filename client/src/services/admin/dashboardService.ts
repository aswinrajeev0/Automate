import { adminApi } from "../../api/admin.axios"

export const customerGrowth = async (filter: string) => {
    try {
        const response = await adminApi.get("/customer-growth",{
            params: {
                filter
            }
        })

        return response.data
    } catch (error: any) {
        throw error.response.data
    }
}