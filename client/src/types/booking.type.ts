export interface IBooking {
    customer: string;
    customerId: string;
    customerPhone: string;
    bookingId: string;
    price: string;
    gst: number;
    amount: number;
    time: string;
    type: string;
    endTime: string;
    date: Date;
    status: string;
}

export interface ICustomerBooking {
    customer: string;
    customerId: string;
    customerPhone: string;
    workshop: string;
    workshopId: string;
    workshopPhone: string;
    bookingId: string;
    price: string;
    gst: number;
    amount: number;
    time: string;
    type: string;
    endTime: string;
    date: Date;
    status: string;
}