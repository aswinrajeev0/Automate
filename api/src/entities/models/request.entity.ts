export interface IRequestEntity {
    id: string;
    requestId: string,
    name: string;
    mobile: string;
    vehicleNo: string;
    carType: string;
    carBrand: string;
    location: string;
    type: "car-lift" | "mobile-workshop";
    status: "submitted" | "pending" | "finished" | "accepted" | "rejected";
    paymentStatus: "pending" | "completed";
    workshopId: string;
    customerId: string;
    image?: string;
    description?: string;
    notes?: string;
    createdAt: Date;
    updatesAt: Date;
}
