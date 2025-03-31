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
import { IRefreshTokenUseCase } from "../../entities/useCaseInterfaces/admin/admin-refresh-token.usecase.interface";
import { RefreshTokenUseCase } from "../../useCases/refresh-token.usecase";
import { IFeaturedWorkshopsUseCase } from "../../entities/useCaseInterfaces/workshop/getFeatured-workshops.usecase.interface";
import { FeaturedWorkshopsUseCase } from "../../useCases/workshop/getFeatured-workshops.interface";
import { IGenerateSignatureUseCase } from "../../entities/useCaseInterfaces/auth/generate-signature.usecase.interface";
import { GenerateSignatureUseCase } from "../../useCases/generate-signature.usecase";
import { IEditCustomerUseCase } from "../../entities/useCaseInterfaces/customer/edit-customer.interface.usecase";
import { EditCustomerUseCase } from "../../useCases/customers/edit-customer.usecase";
import { IDeleteCustomerUseCase } from "../../entities/useCaseInterfaces/customer/delete-customer.usecase.interface";
import { DeleteCustomerUseCase } from "../../useCases/customers/delete-customer.usecase";
import { IGetWorkshopAddressUseCase } from "../../entities/useCaseInterfaces/workshop/get-workshop-address.usecase.interface";
import { GetWorkshopAddressUseCase } from "../../useCases/workshop/get-workshop-address.usecase";
import { IEditWorkshopUseCase } from "../../entities/useCaseInterfaces/workshop/edit-workshop.usecase.interface";
import { EditWorkshopUseCase } from "../../useCases/workshop/edit-workshop.usecase";
import { IEditWorkshopAddressUseCase } from "../../entities/useCaseInterfaces/workshop/edit-workshop-address.usecase.interface";
import { EditWorkshopAddressUseCase } from "../../useCases/workshop/edit-workshop-address.usecase";
import { IGetCustomerAddressUseCase } from "../../entities/useCaseInterfaces/customer/get-customer-address.usecase.interface";
import { GetCustomerAddressUseCase } from "../../useCases/customers/get-customer-address.usecase";
import { IEditCustomerAddressUseCase } from "../../entities/useCaseInterfaces/customer/edit-customer-address.usecase.interface";
import { EditCustomerAddressUseCase } from "../../useCases/customers/edit-customer-address.usecase";
import { IChangeCustomerPasswordUseCase } from "../../entities/useCaseInterfaces/customer/change-password.usecase.interface";
import { ChangeCustomerPasswordUseCase } from "../../useCases/customers/change-password.usecase";
import { IChangeWorkshopPasswordUseCase } from "../../entities/useCaseInterfaces/workshop/change-password.usecase.interface";
import { ChangeWorkshopPasswordUseCase } from "../../useCases/workshop/workshop-change-password.usecase";
import { IWorkshopDetailsUseCase } from "../../entities/useCaseInterfaces/workshop/workshop-details.usecase.interface";
import { WorkshopDetailsUseCase } from "../../useCases/workshop/workshop-details.usecase";
import { ISubmitReviewUseCase } from "../../entities/useCaseInterfaces/review/submit-review.usecase.interface";
import { SubmitReviewUseCase } from "../../useCases/review/submit-review.usecase";
import { IGetBookedSlotsUseCase } from "../../entities/useCaseInterfaces/bookings/get-booked-slots.usecase.interface";
import { GetBookedSlotsUseCase } from "../../useCases/bookings/get-booked-slots.usecase";
import { IBookSlotUseCase } from "../../entities/useCaseInterfaces/bookings/slot-book.usecase.interface";
import { BookSlotUseCase } from "../../useCases/bookings/book-slot.usecase";
import { ICarLiftRequestUseCase } from "../../entities/useCaseInterfaces/requests/carlift-request.usecase.interface";
import { CarLiftRequestUseCase } from "../../useCases/requests/carlift-request.usecase";
import { IMobileWorkshopRequestUseCase } from "../../entities/useCaseInterfaces/requests/mobileworkshop-request.usecase.interface";
import { MobileWorkshopRequestUseCase } from "../../useCases/requests/mobileworkshop-request.usecase";
import { IAllPendingRequestsUseCAse } from "../../entities/useCaseInterfaces/requests/all-pending-request.usecase.interface";
import { AllPendingRequestsUseCAse } from "../../useCases/requests/all-pending-requests.usecase";
import { IRequestDetailsUseCase } from "../../entities/useCaseInterfaces/requests/request-details.usecase.interface";
import { RequestDetailsUseCase } from "../../useCases/requests/request-details.usecase";
import { IAcceptRequestUseCase } from "../../entities/useCaseInterfaces/requests/update-request.usecase.interface";
import { AcceptRequestUseCase } from "../../useCases/requests/request-update.usecase";
import { IRejectRequestUSeCase } from "../../entities/useCaseInterfaces/requests/reject-request.usecase.interface";
import { RejectRequestUSeCase } from "../../useCases/requests/reject-request.usecase";
import { GetAllWorkshopsWithRatingUseCase } from "../../useCases/workshop/get-all-workshops-with-ratings.usecase";
import { IGetAllWorkshopsWithRatingUseCase } from "../../entities/useCaseInterfaces/workshop/get-all-workshops-with-rating.usecase.interface";

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

        container.register<IRefreshTokenUseCase>("IRefreshTokenUseCase", {
            useClass: RefreshTokenUseCase
        })

        container.register<IFeaturedWorkshopsUseCase>("IFeaturedWorkshopsUseCase", {
            useClass: FeaturedWorkshopsUseCase
        })

        container.register<IGenerateSignatureUseCase>("IGenerateSignatureUseCase", {
            useClass: GenerateSignatureUseCase
        })

        container.register<IEditCustomerUseCase>("IEditCustomerUseCase", {
            useClass: EditCustomerUseCase
        })

        container.register<IDeleteCustomerUseCase>("IDeleteCustomerUseCase", {
            useClass: DeleteCustomerUseCase
        })

        container.register<IGetWorkshopAddressUseCase>("IGetWorkshopAddressUseCase", {
            useClass: GetWorkshopAddressUseCase
        })

        container.register<IEditWorkshopUseCase>("IEditWorkshopUseCase", {
            useClass: EditWorkshopUseCase
        })

        container.register<IEditWorkshopAddressUseCase>("IEditWorkshopAddressUseCase", {
            useClass: EditWorkshopAddressUseCase
        })

        container.register<IGetCustomerAddressUseCase>("IGetCustomerAddressUseCase", {
            useClass: GetCustomerAddressUseCase
        })

        container.register<IEditCustomerAddressUseCase>("IEditCustomerAddressUseCase", {
            useClass: EditCustomerAddressUseCase
        })

        container.register<IChangeCustomerPasswordUseCase>("IChangeCustomerPasswordUseCase", {
            useClass: ChangeCustomerPasswordUseCase
        })

        container.register<IChangeWorkshopPasswordUseCase>("IChangeWorkshopPasswordUseCase", {
            useClass: ChangeWorkshopPasswordUseCase
        })

        container.register<IWorkshopDetailsUseCase>("IWorkshopDetailsUseCase", {
            useClass: WorkshopDetailsUseCase
        })

        container.register<ISubmitReviewUseCase>("ISubmitReviewUseCase", {
            useClass: SubmitReviewUseCase
        })

        container.register<IGetBookedSlotsUseCase>("IGetBookedSlotsUseCase", {
            useClass: GetBookedSlotsUseCase
        })

        container.register<IBookSlotUseCase>("IBookSlotUseCase", {
            useClass: BookSlotUseCase
        })

        container.register<ICarLiftRequestUseCase>("ICarLiftRequestUseCase", {
            useClass: CarLiftRequestUseCase
        })

        container.register<IMobileWorkshopRequestUseCase>("IMobileWorkshopRequestUseCase", {
            useClass: MobileWorkshopRequestUseCase
        })

        container.register<IAllPendingRequestsUseCAse>("IAllPendingRequestsUseCAse", {
            useClass: AllPendingRequestsUseCAse
        })

        container.register<IRequestDetailsUseCase>("IRequestDetailsUseCase", {
            useClass: RequestDetailsUseCase
        })

        container.register<IAcceptRequestUseCase>("IAcceptRequestUseCase", {
            useClass: AcceptRequestUseCase
        })

        container.register<IRejectRequestUSeCase>("IRejectRequestUSeCase", {
            useClass: RejectRequestUSeCase
        })

        container.register<IGetAllWorkshopsWithRatingUseCase>("IGetAllWorkshopsWithRatingUseCase", {
            useClass: GetAllWorkshopsWithRatingUseCase
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