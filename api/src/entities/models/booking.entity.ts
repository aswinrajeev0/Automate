export interface IBookingEntity {
    bookingId: string,
    customerId: string,
    workshopId: string,
    date: Date,
    time: string,
    status: "pending" | "accepted" | "confirmed",
    type: string
}