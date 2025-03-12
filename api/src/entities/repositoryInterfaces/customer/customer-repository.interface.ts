import { ICustomerEntity } from "../../models/customer.entity";

export interface ICustomerRepository {
    save(data: Partial<ICustomerEntity>): Promise<ICustomerEntity>;
    findByEmail(email: string): Promise<ICustomerEntity | null>;
    findById(id: any): Promise<ICustomerEntity | null>;
    updateByEmail(
        email: string,
        updates: Partial<ICustomerEntity>
    ): Promise<ICustomerEntity | null>;
}