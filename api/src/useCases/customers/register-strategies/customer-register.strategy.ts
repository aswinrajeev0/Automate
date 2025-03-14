import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../../entities/repositoryInterfaces/customer/customer-repository.interface";
import { CustomError } from "../../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { generateUniqueId } from "../../../frameworks/security/uniqueuid.bcrypt";
import { CustomerDTO } from "../../../shared/dtos/customer.dto";
import { ICustomerEntity } from "../../../entities/models/customer.entity";

export interface ICustomerRegisterStrategy {
    register(user: CustomerDTO): Promise<ICustomerEntity | void>;
}

@injectable()
export class CustomerRegisterStrategy implements ICustomerRegisterStrategy {
    constructor(
        @inject("ICustomerRepository") private customerRepository: ICustomerRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
    ) { }

    async register(user: CustomerDTO): Promise<ICustomerEntity | void> {
        const existingCustomer = await this.customerRepository.findByEmail(user.email);
        if (existingCustomer) {
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_EXISTS,
                HTTP_STATUS.CONFLICT
            )
        }
        const { name, email, phoneNumber, password } = user as CustomerDTO

        let hashedPassword = null;
        if (password) {
            hashedPassword = await this.passwordBcrypt.hash(password)
        }

        const customerId = generateUniqueId();
        return await this.customerRepository.save({
            name,
            email,
            phone: phoneNumber,
            password: hashedPassword ?? "",
            customerId
        })
    }
}