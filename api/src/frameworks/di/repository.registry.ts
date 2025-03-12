import { container } from "tsyringe";

import { ICustomerRepository } from "@/entities/repositoryInterfaces/customer/customer-repository.interface";
import { CustomerRepository } from "@/interface-adapters/repositories/customers/customer.repository";


export class RepositoryRegistry {
    static registerRepositories(): void {
        container.register<ICustomerRepository>("ICustomerRepository", {
            useClass: CustomerRepository
        })
    }
}