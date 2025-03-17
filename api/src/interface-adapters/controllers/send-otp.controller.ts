import { inject, injectable } from "tsyringe";
import { ISendOtpController } from "../../entities/controllerInterfaces/sendotp-controller.interface";
import { ISendOtpUseCase } from "../../entities/useCaseInterfaces/auth/send-otp-usecase.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { NextFunction, Request, Response } from "express";

@injectable()
export class SendOtpController implements ISendOtpController {
    constructor(
        @inject("ISendOtpUseCase") private sendOtpUseCase: ISendOtpUseCase
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;
            await this.sendOtpUseCase.execute(email);
            res.status(HTTP_STATUS.OK).json({
                message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS,
                success: true
            });
        } catch (error) {
            next(error)
        }
    }
}