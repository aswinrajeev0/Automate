import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { bookedSlots, bookSlot, cancelSlot } from "../../services/customer/slotService"

export interface BookSlot {
    bookingId?: string
    customerId?: string,
    workshopId?: string,
    time: string,
    date: Date,
    type: string,
    endTime: string,
    duration: number,
    price: number,
    amount: number,
    gst?: number
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
        onMutate: async (newBooking) => {
            await queryClient.cancelQueries({ queryKey: ["booked-slots", workshopId, type] });
            const previousSlots = queryClient.getQueryData<{ bookings: BookSlot[] }>(["booked-slots", workshopId, type]);
            if (previousSlots) {
                queryClient.setQueryData(
                    ["booked-slots", workshopId, type],
                    {
                        ...previousSlots,
                        bookings: [...previousSlots.bookings, newBooking]
                    }
                );
            }
            return {previousSlots}
        },
        onError: (error) => {
            console.error('Booking failed:', error);
        }
    })
}

export const useCancelSlot = (workshopId: string, type: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (bookingId: string) => cancelSlot(bookingId),
        onMutate: async (bookingId) => {
            await queryClient.cancelQueries({ queryKey: ["booked-slots", workshopId, type] });
            const previousSlots = queryClient.getQueryData<{ bookings: BookSlot[] }>(["booked-slots", workshopId, type]);
            if (previousSlots?.bookings) {
                queryClient.setQueryData(
                    ["booked-slots", workshopId, type],
                    {
                        ...previousSlots,
                        bookings: previousSlots.bookings.filter(slot => slot.bookingId !== bookingId)
                    }
                );
            }

            return { previousSlots };
        },
        onError: (error, bookingId, context) => {
            if (context?.previousSlots) {
                queryClient.setQueryData(
                    ["booked-slots", workshopId, type],
                    context.previousSlots
                );
            }
        }
    })
}