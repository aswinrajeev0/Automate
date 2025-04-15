import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fallbackUsers, fetchConversations, startChat } from "../../services/chat/fetchConversations"

export const useFetchConversations = (userType: string) => {
    return useQuery({
        queryKey: ["conversations", userType],
        queryFn: () => fetchConversations(userType)
    })
}

export const useFallbackUsers = (userType: string) => {
    return useQuery({
        queryKey: ["falback-users", userType],
        queryFn: () => fallbackUsers(userType)
    })
}

export const useStartChat = (userType: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({customerId, workshopId}: {customerId: string; workshopId: string}) => startChat(userType, customerId, workshopId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["coversations", userType]})
        }
    })
}