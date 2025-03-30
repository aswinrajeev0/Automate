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
    workshopId: string;
    customerId: string;
    image?: string;
    description?: string;
    notes?: string;
}
