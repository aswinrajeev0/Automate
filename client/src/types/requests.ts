export interface ICarLiftdata {
    name: string;
    mobile: string;
    vehicleNo: string;
    carType: string;
    carBrand: string;
    location: string;
    image: string;
    workshopId: string;
    lat?: number;
    lon?: number;
    type: string;
}

export interface IMobileWorkshop {
    name: string;
    mobile: string;
    vehicleNo: string;
    carType: string;
    carBrand: string;
    location: string;
    description: string;
    notes?: string;
    workshopId: string;
    lat?: number;
    lon?: number;
    type: string;
}

export interface IAllPendingRequests {
    name: string;
    date: Date;
    location: string;
    requestId: string;
    vehicleNo: string;
    type: string;
}

export interface IRequest {
    status: string;
    name: string;
    requestId: string;
    location: string;
    vehicleNo: string;
    mobile: string;
    date: Date;
    type: string;
    paymentStatus: string;
    description?: string;
    notes?: string;
    image?: string;
    createdAt: string;
    carType: string;
    carBrand: string;
}

export interface IJobs {
    name: string;
    date: string;
    location: string;
    requestId: string;
    vehicleNo: string;
    type: string;
}

export interface IUserRequestResponse {
    status: string;
    name: string;
    requestId: string;
    date: Date;
    type: string;
    workshop: {
        name: string
    }
    amount: number;
}