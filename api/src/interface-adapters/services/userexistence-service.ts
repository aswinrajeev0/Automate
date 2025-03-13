import { inject, injectable } from "tsyringe";
import { IUserExistenceService } from "../../entities/serviceInterfaces.ts/userExistance-service.interface";
import { ICustomerRepository } from "../../entities/repositoryInterfaces/customer/customer-repository.interface";

@injectable()
export class UserExistenceService implements IUserExistenceService {
    constructor(
        @inject("ICustomerRepository")
        private customerRepository: ICustomerRepository
    ){}

    async emailExists(email: string): Promise<boolean> {
        const [user] = await Promise.all([
            this.customerRepository.findByEmail(email)
        ])

        return Boolean(user)
    }
}