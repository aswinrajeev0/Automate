import { inject, injectable } from "tsyringe";
import { ISendOtpUseCase } from "../entities/useCaseInterfaces/auth/send-otp-usecase.interface";
import { IEmailService } from "../entities/serviceInterfaces.ts/email-service.interface";
import { IOtpService } from "../entities/serviceInterfaces.ts/otp-service.interface";
import { IUserExistenceService } from "../entities/serviceInterfaces.ts/userExistance-service.interface";
import { IBcrypt } from "../frameworks/security/bcrypt.interface";
import { CustomError } from "../entities/utils/custom.error";
import { ERROR_MESSAGES, SUCCESS_MESSAGES, HTTP_STATUS } from "../shared/constants";

@injectable()
export class SendOtpUseCase implements ISendOtpUseCase {

    constructor(
        @inject("IEmailService")
        private emailService: IEmailService,
        @inject("IOtpService")
        private otpService: IOtpService,
        @inject("IUserExistenceService")
        private userExistanceService: IUserExistenceService,
        @inject("IOtpBcrypt")
        private otpBcrypt: IBcrypt
    ){}

    async execute(email: string): Promise<void> {
        const emailExists = await this.userExistanceService.emailExists(email);
        if(emailExists){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_EXISTS,
                HTTP_STATUS.CONFLICT
            )
        }

        const otp = this.otpService.generateOtp();
        console.log(`OTP: ${otp}`);
        const hashOtp = await this.otpBcrypt.hash(otp);
        await this.otpService.storeOtp(email, hashOtp);
        await this.emailService.sendOtpEmail(
            email,
            "AutoMate - Verify your email.",
            otp
        )
    }
}