import { inject, injectable } from "tsyringe";
import { ICustomerResetPasswordUseCase } from "../../entities/useCaseInterfaces/customer/customer-reset-password.usecase.interface";
import { ITokenService } from "../../entities/serviceInterfaces.ts/token-service.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { ICustomerRepository } from "../../entities/repositoryInterfaces/customer/customer-repository.interface";
import { passwordSchema } from "../../shared/validations/password.validation";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";

@injectable()
export class CustomerResetPasswordUseCase implements ICustomerResetPasswordUseCase {

    constructor(
        @inject("ITokenService")
        private tokenService: ITokenService,
        @inject("ICustomerRepository")
        private customerRepo: ICustomerRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
    ) { }

    async execute(token: string, password: string, cpassword: string): Promise<void> {
        if (!token) {
            throw new CustomError(
                ERROR_MESSAGES.INVALID_TOKEN,
                HTTP_STATUS.UNAUTHORIZED
            )
        }

        if (password !== cpassword) {
            throw new CustomError(
                ERROR_MESSAGES.INVALID_CREDENTIALS,
                HTTP_STATUS.BAD_REQUEST
            )
        }

        passwordSchema.parse(password);

        const decoded = await this.tokenService.decodeResetToken(token);
        if (!decoded || !decoded.email) {
            throw new CustomError(
                ERROR_MESSAGES.INVALID_TOKEN,
                HTTP_STATUS.UNAUTHORIZED
            )
        }
        const email = decoded.email;
        let hashedPassword = await this.passwordBcrypt.hash(password);

        const update = {
            password: hashedPassword
        }
        
        await this.customerRepo.updateByEmail(email, update)
    }
}