import { Request, Response } from "express";
import { IVerifyOtpController } from "../../entities/controllerInterfaces/verifyotp-interface";
import { inject, injectable } from "tsyringe";
import { IVerifyOtpUseCase } from "../../entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { otpMailValidation } from "./validations/otp-mail.validation";
import {
    ERROR_MESSAGES,
    HTTP_STATUS,
    SUCCESS_MESSAGES
} from "../../shared/constants";
import { ZodError } from "zod";

@injectable()
export class VerifyOtpController implements IVerifyOtpController {
    constructor(
        @inject("IVerifyOtpUseCase")
        private verifyOtp: IVerifyOtpUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp } = req.body;
            const validatedData = otpMailValidation.parse({ email, otp })
            await this.verifyOtp.execute(validatedData);

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.VERIFICATION_SUCCESS
            })
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map(err => ({
                    message: err.message
                }))

                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.VALIDATION_ERROR,
                    errors
                });
                return;
            }

            if (error instanceof CustomError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
                return;
            }

            console.error("Error at verify otp controller",error)
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES.SERVER_ERROR
            })
        }
    }
}