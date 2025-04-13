import { useQuery } from "@tanstack/react-query"
import { fetchConversations } from "../../services/chat/fetchConversations"

export const useFetchConversations = (userType: string) => {
    return useQuery({
        queryKey: ["conversations", userType],
        queryFn: () => fetchConversations(userType)
    })
}