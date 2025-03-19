import { updateCustomerStatus } from "../../services/admin/adminService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToaster } from "../ui/useToaster";
import { CustomersData, ICustomer } from "../../components/admin/customers/Customers";

export const useUpdateCustomerStatusMutation = (currentPage: number, limit: number, search: string) => {
    const { successToast, errorToast } = useToaster();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => updateCustomerStatus(userId),
        onMutate: async (userId) => {
            const queryKey = ["customers", currentPage, limit, search];
            await queryClient.cancelQueries({ queryKey });
            const previousData = queryClient.getQueryData(queryKey)

            queryClient.setQueryData(queryKey, (oldData: CustomersData) => {
                if (!oldData || !oldData.customers) return oldData;

                return {
                    ...oldData,
                    customers: oldData.customers.map((customer: ICustomer) => 
                        customer._id === userId
                            ? {...customer, isBlocked: !customer.isBlocked}
                            : customer
                    )
                }
            })

            return {previousData, queryKey}
        },
        onSuccess: (data) => {
            successToast(data.message);
        },
        onError: (error: any, _, context) => {
            if(context?.previousData) {
                queryClient.setQueryData(context.queryKey, context.previousData);
            }
            errorToast(error.response?.data?.message || "An error occurred");
        },
    });
};
