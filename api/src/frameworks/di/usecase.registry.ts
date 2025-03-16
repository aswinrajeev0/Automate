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
import { AdminLoginUseCase } from "../../useCases/admin/admin-login.usecase";
import { IAdminLoginUseCase } from "../../entities/useCaseInterfaces/admin/admin-login-usecase.interface";
import { IGetAllCustomersUseCase } from "../../entities/useCaseInterfaces/customer/get-allcustomers.usecase.interface";
import { GetAllCustomersUseCase } from "../../useCases/customers/get-all-customers.usecase";
import { IUpdateCustomerStatusUseCase } from "../../entities/useCaseInterfaces/customer/updateCustomer-status.usecase";
import { UpdateCustomerStatusUseCase } from "../../useCases/customers/updateCustomer-status.usecase";
import { IWorkshopSignupUseCase } from "../../entities/useCaseInterfaces/workshop/workshop-signup-usecase.interface";
import { WorkshopSignUpUseCase } from "../../useCases/workshop/workshop-signup.usecase";
import { IWorkshopLoginUseCase } from "../../entities/useCaseInterfaces/workshop/workshop-login-usecase.interface";
import { WorkshopLoginUseCase } from "../../useCases/workshop/workshop-login.usecase";
import { ICustomerResetPasswordOtpUseCase } from "../../entities/useCaseInterfaces/resend-otp.usecase.interface";
import { CustomerResetPasswordOtpUseCase } from "../../useCases/customers/customer-reset-otp.usecase";
import { ICustomerResetPasswordUseCase } from "../../entities/useCaseInterfaces/customer/customer-reset-password.usecase.interface";
import { CustomerResetPasswordUseCase } from "../../useCases/customers/customer-reset-password.usecase";

import { IEmailService } from "../../entities/serviceInterfaces.ts/email-service.interface";
import { EmailService } from "../../interface-adapters/services/email-service";
import { IOtpService } from "../../entities/serviceInterfaces.ts/otp-service.interface";
import { OtpService } from "../../interface-adapters/services/otp-service";
import { IUserExistenceService } from "../../entities/serviceInterfaces.ts/userExistance-service.interface";
import { UserExistenceService } from "../../interface-adapters/services/userexistence-service";
import { ITokenService } from "../../entities/serviceInterfaces.ts/token-service.interface";
import { JWTService } from "../../interface-adapters/services/jwt-service";
import { IGetAllWorkshopsUseCase } from "../../entities/useCaseInterfaces/workshop/get-allworkshops-usecase.interface";
import { GetAllWorkshopsUseCase } from "../../useCases/workshop/get-allworkshops.usecase";

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

        container.register<IAdminLoginUseCase>("IAdminLoginUseCase", {
            useClass: AdminLoginUseCase
        })

        container.register<IGetAllCustomersUseCase>("IGetAllCustomersUseCase", {
            useClass: GetAllCustomersUseCase
        })

        container.register<IUpdateCustomerStatusUseCase>("IUpdateCustomerStatusUseCase", {
            useClass: UpdateCustomerStatusUseCase
        })

        container.register<IWorkshopSignupUseCase>("IWorkshopSignupUseCase", {
            useClass: WorkshopSignUpUseCase
        })

        container.register<IWorkshopLoginUseCase>("IWorkshopLoginUseCase", {
            useClass: WorkshopLoginUseCase
        })

        container.register<ICustomerResetPasswordOtpUseCase>("ICustomerResetPasswordOtpUseCase", {
            useClass: CustomerResetPasswordOtpUseCase
        })

        container.register<ICustomerResetPasswordUseCase>("ICustomerResetPasswordUseCase", {
            useClass: CustomerResetPasswordUseCase
        })

        container.register<IGetAllWorkshopsUseCase>("IGetAllWorkshopsUseCase", {
            useClass: GetAllWorkshopsUseCase
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