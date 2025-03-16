import { updateCustomerStatus } from "../../services/admin/adminService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToaster } from "../ui/useToaster";

export const useUpdateCustomerStatusMutation = () => {
	const {successToast, errorToast} = useToaster();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (userId: string) => updateCustomerStatus(userId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
            successToast(data.message);
        },
        onError: (error: any) => {
            errorToast(error.response?.data?.message || "An error occurred");
        },
	});
};
