import { useMutation, useQuery } from "@tanstack/react-query"
import { allPendingRequests, requestDetails, acceptRequest, rejectRequest } from "../../services/workshop/workshopRequestsService"
import { queryClient } from "../../lib/queryClient"

export const useAllPendingRequests = (currentPage: number, limit: number, searchTerm: string) => {
    return useQuery({
        queryKey: ["all-pending-requests", currentPage, limit, searchTerm],
        queryFn: () => allPendingRequests(currentPage, limit, searchTerm)
    })
}

export const useRequestDetails = (requestId: string) => {
    return useQuery({
        queryKey: ["request-details", requestId],
        queryFn: () => requestDetails(requestId),
        enabled: !!requestId
    })
}

export const useAcceptRequest = () => {
    return useMutation({
        mutationFn: (requestId: string) => acceptRequest(requestId),
        onSuccess: (data, requestId) => {
            queryClient.setQueryData(["request-details", requestId], (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    request: {
                        ...oldData.request,
                        status: "accepted",
                    },
                };
            });

            queryClient.invalidateQueries({ queryKey: ["all-pending-requests"] });
        }
    })
}

export const useRejectRequest = () => {
    return useMutation({
        mutationFn: (requestId: string) => rejectRequest(requestId),
        onSuccess: (data, requestId) => {
            queryClient.setQueryData(["request-details", requestId], (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    request: {
                        ...oldData.request,
                        status: "rejected",
                    },
                };
            });

            queryClient.invalidateQueries({ queryKey: ["all-pending-requests"] });
        }
    })
}