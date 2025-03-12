import { ICustomerEntity } from "@/entities/models/customer.entity";
import { IWorkshopEntity } from "@/entities/models/workshop.entity";

export interface ICustomerRegisterUseCase {
    execute(customer: Partial<ICustomerEntity>): Promise<void>;
}

export interface IWorkshopRegisterUseCase {
    execute(workshop: Partial<IWorkshopEntity>): Promise<void>;
}