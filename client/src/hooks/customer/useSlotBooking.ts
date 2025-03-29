import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { bookedSlots, bookSlot } from "../../services/customer/slotService"

export interface BookSlot {
    customerId?: string,
    workshopId?: string,
    time: string,
    date: Date,
    type: string
}

export const useBookedSlots = (workshopId: string, type: string) => {
    return useQuery({
        queryKey: ["booked-slots", workshopId, type],
        queryFn: () => bookedSlots(workshopId, type)
    })
}

export const useBookSlot = (workshopId: string, type: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: BookSlot) => bookSlot(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["booked-slots", workshopId, type]});
        },
        onError: (error) => {
            console.error('Booking failed:', error);
        }
    })
}