import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CustomerEditUploadData } from "../../types/auth"
import { updateCustomer } from "../../services/customer/authServices"

export const useCustomerUpdateProfile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CustomerEditUploadData) => updateCustomer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["customer-profile"]})
        },
        onError: (error: Error) => {
            console.error("Error in updating profile", error)
        }
    })
}