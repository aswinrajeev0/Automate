import { inject, injectable } from "tsyringe";
import { ISendOtpController } from "../../entities/controllerInterfaces/sendotp-controller.interface";
import { ISendOtpUseCase } from "../../entities/useCaseInterfaces/auth/send-otp-usecase.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { Request, Response } from "express";

@injectable()
export class SendOtpController implements ISendOtpController {
    constructor(
        @inject("ISendOtpUseCase")
        private sendOtpUseCase: ISendOtpUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<void> {
        
        try {
            const { email } = req.body;
            await this.sendOtpUseCase.execute(email);
            res.status(HTTP_STATUS.OK).json({
                message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS,
                success: true
            });
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map(err => ({
                    message: err.message
                }));

                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.VALIDATION_ERROR,
                    errors
                })
                return;
            }

            if (error instanceof CustomError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
                return;
            }

            console.log("Error at Send-otp-controller", error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES.SERVER_ERROR,
            });
        }
    }
}