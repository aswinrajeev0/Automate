import { container } from "tsyringe";

import { IBcrypt } from "../security/bcrypt.interface";
import { PasswordBcrypt } from "../security/password.bcrypt";
import { OtpBcrypt } from "../security/otp.bcrypt";

import { CustomerRegisterStrategy } from "../../useCases/customers/register-strategies/customer-register.strategy";

import { ICustomerRegisterUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface";
import { CustomerRegisterUseCase } from "../../useCases/customers/customer-register.usecase";
import { ISendOtpUseCase } from "../../entities/useCaseInterfaces/auth/send-otp-usecase.interface";
import { SendOtpUseCase } from "../../useCases/send-otp.usecase";
import { IVerifyOtpUseCase } from "../../entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import { VerifyOtpUseCase } from "../../useCases/verify-otp.usecase";
import { ILoginCustomerUseCase } from "../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginCustomerUseCase } from "../../useCases/customers/customer-login.usecase";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/generatetoken.usecase.interface";
import { GenerateTokenUseCase } from "../../useCases/generate-token.usecase";

import { IEmailService } from "../../entities/serviceInterfaces.ts/email-service.interface";
import { EmailService } from "../../interface-adapters/services/email-service";
import { IOtpService } from "../../entities/serviceInterfaces.ts/otp-service.interface";
import { OtpService } from "../../interface-adapters/services/otp-service";
import { IUserExistenceService } from "../../entities/serviceInterfaces.ts/userExistance-service.interface";
import { UserExistenceService } from "../../interface-adapters/services/userexistence-service";
import { ITokenService } from "../../entities/serviceInterfaces.ts/token-service.interface";
import { JWTService } from "../../interface-adapters/services/jwt-service";

export class UseCaseRegistry {
    static registerUseCases(): void {
        //register use case
        container.register<ICustomerRegisterUseCase>("ICustomerRegisterUseCase", {
            useClass: CustomerRegisterUseCase
        })

        container.register<ISendOtpUseCase>("ISendOtpUseCase", {
            useClass: SendOtpUseCase
        })

        container.register<IVerifyOtpUseCase>("IVerifyOtpUseCase", {
            useClass: VerifyOtpUseCase
        })

        container.register<ILoginCustomerUseCase>("ILoginCustomerUseCase", {
            useClass: LoginCustomerUseCase
        })

        container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase", {
            useClass: GenerateTokenUseCase
        })

        //* ====== Register Strategies ====== *//
        container.register("CustomerRegisterStrategy", {
            useClass: CustomerRegisterStrategy,
        });

        //* ====== Register Bcrypts ====== *//
        container.register<IBcrypt>("IPasswordBcrypt", {
            useClass: PasswordBcrypt,
        });

        container.register<IBcrypt>("IOtpBcrypt", {
            useClass: OtpBcrypt,
        });

        //register services
        container.register<IEmailService>("IEmailService", {
            useClass: EmailService
        })

        container.register<IOtpService>("IOtpService", {
            useClass: OtpService
        })

        container.register<IUserExistenceService>("IUserExistenceService", {
            useClass: UserExistenceService
        })

        container.register<ITokenService>("ITokenService",{
            useClass: JWTService
        })
    }
}