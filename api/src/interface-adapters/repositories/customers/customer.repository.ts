import { injectable } from "tsyringe";
import { CustomerModel } from "@/frameworks/database/mongoDB/models/customer.model";
import { ICustomerEntity } from "@/entities/models/customer.entity";
import { ICustomerRepository } from "@/entities/repositoryInterfaces/customer/customer-repository.interface";

@injectable()
export class CustomerRepository implements ICustomerRepository {
    async save(data: Partial<ICustomerEntity>): Promise<ICustomerEntity> {
        return await CustomerModel.create(data)
    };

    async findById(id: any): Promise<ICustomerEntity | null> {
        const customer = await CustomerModel.findById(id);
        if (!customer) return null;

        return {
            ...customer,
            id: customer._id.toString()
        } as ICustomerEntity;
    };

    async findByEmail(email: string): Promise<ICustomerEntity | null> {
        const customer = await CustomerModel.findOne({ email });
        if (!customer) return null;

        return {
            ...customer,
            id: customer._id.toString()
        } as ICustomerEntity;
    };

    async updateByEmail(email: string, updates: Partial<ICustomerEntity>): Promise<ICustomerEntity | null> {
        const customer = await CustomerModel.findOneAndUpdate({ email }, { $set: updates }, { new: true })
        if (!customer) return null;

        return {
            ...customer,
            id: customer._id.toString()
        } as ICustomerEntity;
    }
}