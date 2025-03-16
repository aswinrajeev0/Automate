export interface IWorkshopEntity {
    workshopId?: string,
    id?: string;
    image?: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    country: string;
    state: string;
    city: string;
    streetAddress: string;
    buildingNo: string;
    description?: string;
    isActive: boolean;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}