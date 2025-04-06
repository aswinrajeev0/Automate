import { useMutation, useQuery } from "@tanstack/react-query"
import { addMoney, getWallet } from "../../services/customer/walletService"

export const useGetWallet = () => {
    return useQuery({
        queryKey: ["wallet"],
        queryFn: getWallet
    })
}

export const useAddMoney = () => {
    return useMutation({
        mutationFn: (amount: number) => addMoney(amount)
    })
}