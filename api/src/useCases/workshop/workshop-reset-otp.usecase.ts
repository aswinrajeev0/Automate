import { IWorkshopRepository } from "../../entities/repositoryInterfaces/workshop/workshop-repository.interface";
import { IEmailService } from "../../entities/serviceInterfaces.ts/email-service.interface";
import { IOtpService } from "../../entities/serviceInterfaces.ts/otp-service.interface";
import { IResetPasswordOtpUseCase } from "../../entities/useCaseInterfaces/reset-otp.usecase.interface";
import { inject, injectable } from "tsyringe";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class WorkshopResetPasswordOtpUseCase implements IResetPasswordOtpUseCase {
    constructor(
        @inject("IEmailService")
        private emailService: IEmailService,
        @inject("IOtpService")
        private otpService: IOtpService,
        @inject("IWorkshopRepository")
        private workshopRepo: IWorkshopRepository,
        @inject("IOtpBcrypt")
        private otpBcrypt: IBcrypt
    ) { }

    async execute(email: string): Promise<void> {
        const emailExists = await this.workshopRepo.findByEmail(email)
        if (!emailExists) {
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            );
        }

        const otp = this.otpService.generateOtp();
        console.log(`OTP: ${otp}`);
        const hashOtp = await this.otpBcrypt.hash(otp);
        await this.otpService.storeOtp(email, hashOtp);
        await this.emailService.sendOtpEmail(
            email,
            "AutoMate - Verify your reset password email.",
            otp
        )
    }
}