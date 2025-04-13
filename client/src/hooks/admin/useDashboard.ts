import { useQuery } from "@tanstack/react-query"
import { customerGrowth } from "../../services/admin/dashboardService"

export const useCustomerGrowth = (filter: string = "monthly") => {
    return useQuery({
        queryKey: ["user-growth", filter],
        queryFn:() => customerGrowth(filter)
    })
}