import { inject, injectable } from "tsyringe";
import { ILoginCustomerUseCase } from "../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { CustomerLoginDTO } from "../../shared/dtos/customer.dto";
import { IUserEntity } from "../../entities/models/user.entity";
import { ICustomerRepository } from "../../entities/repositoryInterfaces/customer/customer-repository.interface";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class LoginCustomerUseCase implements ILoginCustomerUseCase {
    constructor(
        @inject("ICustomerRepository")
        private customerRepo: ICustomerRepository,
        @inject("IPasswordBcrypt")
        private passwordBcrypt: IBcrypt
    ) { }

    async execute(user: CustomerLoginDTO): Promise<Partial<IUserEntity>> {
        const customer = await this.customerRepo.findByEmail(user.email)
        if (!customer) {
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        if (customer.isBlocked) {
            throw new CustomError(
                ERROR_MESSAGES.BLOCKED,
                HTTP_STATUS.FORBIDDEN
            )
        }

        if (user.password) {
            const passMatch = this.passwordBcrypt.compare(
                user.password,
                customer.password
            )

            if (!passMatch) {
                throw new CustomError(
                    ERROR_MESSAGES.INVALID_CREDENTIALS,
                    HTTP_STATUS.BAD_REQUEST)
            }
        }
        return customer;
    }
}