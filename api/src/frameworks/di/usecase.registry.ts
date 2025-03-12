import { container } from "tsyringe";

import { IBcrypt } from "../security/bcrypt.interface";
import { PasswordBcrypt } from "../security/password.bcrypt";

import { CustomerRegisterStrategy } from "@/useCases/customers/register-strategies/customer-register.strategy";

import { ICustomerRegisterUseCase } from "@/entities/useCaseInterfaces/auth/register-usecase.interface";
import { CustomerRegisterUseCase } from "@/useCases/customers/customer-register.usecase";


export class UseCaseRegistry {
    static registerUseCases(): void {
        container.register<ICustomerRegisterUseCase>("ICustomerRegisterUseCase", {
            useClass: CustomerRegisterUseCase
        })

        //* ====== Register Strategies ====== *//
        container.register("CustomerRegisterStrategy", {
            useClass: CustomerRegisterStrategy,
        });
    }
}