import { updateWorkshopStatus } from "../../services/admin/adminService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToaster } from "../ui/useToaster";

export const useUpdateWorkshopStatusMutation = () => {
	const {successToast, errorToast} = useToaster();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (workshopId: string) => updateWorkshopStatus(workshopId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["workshops"] });
            successToast(data.message);
        },
        onError: (error: any) => {
            errorToast(error.response?.data?.message || "An error occurred");
        },
	});
};
