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