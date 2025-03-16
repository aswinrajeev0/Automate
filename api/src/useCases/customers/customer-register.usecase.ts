import { inject, injectable } from "tsyringe";
import { ICustomerRegisterUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface";
import { ICustomerRegisterStrategy } from "./register-strategies/customer-register.strategy";
import { CustomerDTO } from "../../shared/dtos/auth.dto";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { ICustomerEntity } from "../../entities/models/customer.entity";

@injectable()
export class CustomerRegisterUseCase implements ICustomerRegisterUseCase {
    private strategies: Record<string, ICustomerRegisterStrategy>;
    constructor(
        @inject("CustomerRegisterStrategy") private customerRegister: ICustomerRegisterStrategy
    ){
        this.strategies = {
            customer: this.customerRegister
        }
    }

    async execute(customer: CustomerDTO): Promise<void> {
        const strategy = this.strategies.customer;
        await strategy.register(customer)
    }
}