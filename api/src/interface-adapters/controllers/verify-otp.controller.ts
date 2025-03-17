import { NextFunction, Request, Response } from "express";
import { IVerifyOtpController } from "../../entities/controllerInterfaces/verifyotp-interface";
import { inject, injectable } from "tsyringe";
import { IVerifyOtpUseCase } from "../../entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import { otpMailValidation } from "./validations/otp-mail.validation";
import {
    HTTP_STATUS,
    SUCCESS_MESSAGES
} from "../../shared/constants";

@injectable()
export class VerifyOtpController implements IVerifyOtpController {
    constructor(
        @inject("IVerifyOtpUseCase")
        private verifyOtp: IVerifyOtpUseCase
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, otp } = req.body;
            const validatedData = otpMailValidation.parse({ email, otp })
            await this.verifyOtp.execute(validatedData);

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.VERIFICATION_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }
}