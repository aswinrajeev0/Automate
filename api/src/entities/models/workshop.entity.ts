export interface IWorkshopEntity {
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
    description?: Date;
    isActive: boolean;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}