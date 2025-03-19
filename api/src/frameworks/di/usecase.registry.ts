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
import { IResetPasswordOtpUseCase } from "../../entities/useCaseInterfaces/reset-otp.usecase.interface";
import { CustomerResetPasswordOtpUseCase } from "../../useCases/customers/customer-reset-otp.usecase";
import { ICustomerResetPasswordUseCase } from "../../entities/useCaseInterfaces/customer/customer-reset-password.usecase.interface";
import { CustomerResetPasswordUseCase } from "../../useCases/customers/customer-reset-password.usecase";
import { IGetAllWorkshopsUseCase } from "../../entities/useCaseInterfaces/workshop/get-allworkshops-usecase.interface";
import { GetAllWorkshopsUseCase } from "../../useCases/workshop/get-allworkshops.usecase";
import { IUpdateWorkshopStatusUseCase } from "../../entities/useCaseInterfaces/workshop/update-worksho-status-usecase.interface";
import { UpdateWorkshopStatusUseCase } from "../../useCases/workshop/update-workshop-status.usecase";

import { IEmailService } from "../../entities/serviceInterfaces.ts/email-service.interface";
import { EmailService } from "../../interface-adapters/services/email-service";
import { IOtpService } from "../../entities/serviceInterfaces.ts/otp-service.interface";
import { OtpService } from "../../interface-adapters/services/otp-service";
import { IUserExistenceService } from "../../entities/serviceInterfaces.ts/userExistance-service.interface";
import { UserExistenceService } from "../../interface-adapters/services/userexistence-service";
import { ITokenService } from "../../entities/serviceInterfaces.ts/token-service.interface";
import { JWTService } from "../../interface-adapters/services/jwt-service";
import { WorkshopResetPasswordOtpUseCase } from "../../useCases/workshop/workshop-reset-otp.usecase";
import { IWorkshopResetPasswordUseCase } from "../../entities/useCaseInterfaces/workshop/workshop-resetPassword-usecase.interface";
import { WorkshopResetPasswordUseCase } from "../../useCases/workshop/workshop-reset-password.usecase.interface";
import { IBlackListTokenUseCase } from "../../entities/useCaseInterfaces/blacklisttoken.usecase.interface";
import { BlackListTokenUseCase } from "../../useCases/blacklist-token.usecase";
import { IRevokeRefreshTokenUseCase } from "../../entities/useCaseInterfaces/revoke-refreshtoken.usecase.interface";
import { RevokeRefreshTokenUseCase } from "../../useCases/revoke-refreshtoken.usecase";
import { ICustomerLogutUseCase } from "../../entities/useCaseInterfaces/customer/customer-logout.interface";
import { CustomerLogutUseCase } from "../../useCases/customers/customer-logout.usecase";
import { IAdminLogoutUseCase } from "../../entities/useCaseInterfaces/admin/admin-logout.usecase.interface";
import { AdminLogoutUseCase } from "../../useCases/admin/admin-logout.usecase";
import { IWorkshopLogoutUseCase } from "../../entities/useCaseInterfaces/workshop/workshoplogout.usecase.interface";
import { WorkshopLogoutUseCase } from "../../useCases/workshop/workshop-logout.usecase";
import { IGoogleUseCase } from "../../entities/useCaseInterfaces/customer/googlelogin.usecase.interface";
import { GoogleUseCase } from "../../useCases/customers/google-login.usecase";
import { IUpdateWorkshopApprovalStatusUseCase } from "../../entities/useCaseInterfaces/workshop/update-workshop-approvalstatus.usecase.interface";
import { UpdateWorkshopApprovalStatusUseCase } from "../../useCases/workshop/update-workshop-approvalstatus.usecase";

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

        container.register<IResetPasswordOtpUseCase>("ICustomerResetPasswordOtpUseCase", {
            useClass: CustomerResetPasswordOtpUseCase
        })

        container.register<IResetPasswordOtpUseCase>("IWorkshopResetPasswordOtpUseCase", {
            useClass: WorkshopResetPasswordOtpUseCase
        })

        container.register<ICustomerResetPasswordUseCase>("ICustomerResetPasswordUseCase", {
            useClass: CustomerResetPasswordUseCase
        })

        container.register<IWorkshopResetPasswordUseCase>("IWorkshopResetPasswordUseCase", {
            useClass: WorkshopResetPasswordUseCase
        })

        container.register<IGetAllWorkshopsUseCase>("IGetAllWorkshopsUseCase", {
            useClass: GetAllWorkshopsUseCase
        })

        container.register<IUpdateWorkshopStatusUseCase>("IUpdateWorkshopStatusUseCase", {
            useClass: UpdateWorkshopStatusUseCase
        })

        container.register<IRevokeRefreshTokenUseCase>("IRevokeRefreshTokenUseCase", {
            useClass: RevokeRefreshTokenUseCase
        })

        container.register<IBlackListTokenUseCase>("IBlackListTokenUseCase", {
            useClass: BlackListTokenUseCase
        })

        container.register<ICustomerLogutUseCase>("ICustomerLogutUseCase", {
            useClass: CustomerLogutUseCase
        })

        container.register<IAdminLogoutUseCase>("IAdminLogoutUseCase", {
            useClass: AdminLogoutUseCase
        })

        container.register<IWorkshopLogoutUseCase>("IWorkshopLogoutUseCase", {
            useClass: WorkshopLogoutUseCase
        })

        container.register<IGoogleUseCase>("IGoogleUseCase", {
            useClass: GoogleUseCase
        })

        container.register<IUpdateWorkshopApprovalStatusUseCase>("IUpdateWorkshopApprovalStatusUseCase", {
            useClass: UpdateWorkshopApprovalStatusUseCase
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

        container.register<ITokenService>("ITokenService", {
            useClass: JWTService
        })
    }
}