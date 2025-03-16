import { inject, injectable } from "tsyringe";
import { ICustomerController } from "../../entities/controllerInterfaces/customer-controller.interface";
import { Request, Response } from "express";
import { IGetAllCustomersUseCase } from "../../entities/useCaseInterfaces/customer/get-allcustomers.usecase.interface";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { ZodError } from "zod";
import { CustomError } from "../../entities/utils/custom.error";
import { IUpdateCustomerStatusUseCase } from "../../entities/useCaseInterfaces/customer/updateCustomer-status.usecase";
import { ICustomerResetPasswordOtpUseCase } from "../../entities/useCaseInterfaces/resend-otp.usecase.interface";
import { ISendOtpUseCase } from "../../entities/useCaseInterfaces/auth/send-otp-usecase.interface";
import { ITokenService } from "../../entities/serviceInterfaces.ts/token-service.interface";
import { ICustomerResetPasswordUseCase } from "../../entities/useCaseInterfaces/customer/customer-reset-password.usecase.interface";

@injectable()
export class CustomerController implements ICustomerController {
    constructor(
        @inject("IGetAllCustomersUseCase")
        private getAllCustomersUseCase: IGetAllCustomersUseCase,
        @inject("IUpdateCustomerStatusUseCase")
        private updateCustomerStatusUseCase: IUpdateCustomerStatusUseCase,
        @inject("ICustomerResetPasswordOtpUseCase")
        private customerResetPasswordOtpUseCase: ICustomerResetPasswordOtpUseCase,
        @inject("ITokenService")
        private tokenService: ITokenService,
        @inject("ICustomerResetPasswordUseCase")
        private customerResetPasswordUseCase: ICustomerResetPasswordUseCase
    ) { }

    async getAllCustomers(req: Request, res: Response): Promise<void> {
        try {
            const { page = 1, limit = 10, search = "" } = req.query;
            const pageNumber = Number(page);
            const pageSize = Number(limit);
            const searchTermString = typeof search === "string" ? search : "";

            const { users, total } = await this.getAllCustomersUseCase.execute(
                pageNumber,
                pageSize,
                searchTermString
            );
            res.status(HTTP_STATUS.OK).json({
                success: true,
                users: users,
                totalPages: total,
                currentPage: pageNumber,
            });
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map(err => ({
                    message: err.message
                }))

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
                });
                return;
            }

            console.error("Error in getting all customers", error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES.SERVER_ERROR,
            });
        }
    }

    async updateCustomerStatus(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            await this.updateCustomerStatusUseCase.execute(userId)
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.UPDATE_SUCCESS
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
                })
                return;
            }

            if (error instanceof CustomError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }

            console.error(error)
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES.SERVER_ERROR
            })
        }
    }

    async resetPasswordOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            await this.customerResetPasswordOtpUseCase.execute(email);
            const token = await this.tokenService.generateResetToken(email)

            res.status(HTTP_STATUS.OK).json({
                message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS,
                success: true,
                token
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

            console.log("Error at reset-password-otp-controller", error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES.SERVER_ERROR,
            });
        }
    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { token, password, confirmPassword } = req.body;
            await this.customerResetPasswordUseCase.execute(token, password, confirmPassword)
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS
            })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES.SERVER_ERROR
            })
        }
    }
}