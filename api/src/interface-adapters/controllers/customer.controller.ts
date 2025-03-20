import { inject, injectable } from "tsyringe";
import { ICustomerController } from "../../entities/controllerInterfaces/customer-controller.interface";
import { NextFunction, Request, Response } from "express";
import { IGetAllCustomersUseCase } from "../../entities/useCaseInterfaces/customer/get-allcustomers.usecase.interface";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { IUpdateCustomerStatusUseCase } from "../../entities/useCaseInterfaces/customer/updateCustomer-status.usecase";
import { IResetPasswordOtpUseCase } from "../../entities/useCaseInterfaces/reset-otp.usecase.interface";
import { ITokenService } from "../../entities/serviceInterfaces.ts/token-service.interface";
import { ICustomerResetPasswordUseCase } from "../../entities/useCaseInterfaces/customer/customer-reset-password.usecase.interface";
import { ICustomerRegisterUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface";
import { customerSchema } from "./validations/customer-signup.validation.schema";
import { clearAuthCookies, setAuthCookies, updateCookieWithAccessToken } from "../../shared/utils/cookie-helper";
import { ILoginCustomerUseCase } from "../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/generatetoken.usecase.interface";
import { ICustomerLogutUseCase } from "../../entities/useCaseInterfaces/customer/customer-logout.interface";
import { IGoogleUseCase } from "../../entities/useCaseInterfaces/customer/googlelogin.usecase.interface";
import { loginSchema } from "./validations/customer-login.validation.schema";
import { IRefreshTokenUseCase } from "../../entities/useCaseInterfaces/admin/admin-refresh-token.usecase.interface";

@injectable()
export class CustomerController implements ICustomerController {
    constructor(
        @inject("ICustomerRegisterUseCase") private customerRegisterUseCase: ICustomerRegisterUseCase,
        @inject("ILoginCustomerUseCase") private loginCustomer: ILoginCustomerUseCase,
        @inject("IGenerateTokenUseCase") private generateTokenUseCase: IGenerateTokenUseCase,
        @inject("IGetAllCustomersUseCase") private getAllCustomersUseCase: IGetAllCustomersUseCase,
        @inject("IUpdateCustomerStatusUseCase") private updateCustomerStatusUseCase: IUpdateCustomerStatusUseCase,
        @inject("ICustomerResetPasswordOtpUseCase") private customerResetPasswordOtpUseCase: IResetPasswordOtpUseCase,
        @inject("ITokenService") private tokenService: ITokenService,
        @inject("ICustomerResetPasswordUseCase") private customerResetPasswordUseCase: ICustomerResetPasswordUseCase,
        @inject("ICustomerLogutUseCase") private customerLogutUseCase: ICustomerLogutUseCase,
        @inject("IGoogleUseCase") private googleUseCase: IGoogleUseCase,
        @inject("IRefreshTokenUseCase") private _refreshToken: IRefreshTokenUseCase
    ) { }

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const schema = customerSchema
            const validatedData = schema.parse(req.body);
            await this.customerRegisterUseCase.execute(validatedData);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
            });
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body
            const schema = loginSchema;
            const validatedData = schema.parse(data);
            const user = await this.loginCustomer.execute(validatedData);
            if (!user.id || !user.email) {
                throw new Error("User id or email is missing.")
            }

            const tokens = await this.generateTokenUseCase.execute(
                user.id,
                user.email,
                "customer"
            )

            const accessTokenName = "customer_access_token";
            const refreshTokenName = "customer_refresh_token";

            setAuthCookies(
                res,
                tokens.accessToken,
                tokens.refreshToken,
                accessTokenName,
                refreshTokenName
            )

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user?.profileImage,
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getAllCustomers(req: Request, res: Response, next: NextFunction): Promise<void> {
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
            next(error)
        }
    }

    async updateCustomerStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            await this.updateCustomerStatusUseCase.execute(userId)
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.UPDATE_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }

    async resetPasswordOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
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
            next(error)
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { token, password, confirmPassword } = req.body;
            await this.customerResetPasswordUseCase.execute(token, password, confirmPassword)
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            if (!req.user) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    success: false,
                    message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
                });
                return;
            }

            await this.customerLogutUseCase.execute(req.user)
            clearAuthCookies(res, "customer_access_token", "customer_refresh_token");

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
            });
        } catch (error) {
            next(error)
        }
    }

    async googleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { credential, client_id } = req.body;
            const user = await this.googleUseCase.execute(
                credential,
                client_id
            );

            if (!user.id || !user.email) {
                throw new Error("User ID, email, or role is missing");
            }

            const tokens = await this.generateTokenUseCase.execute(
                user.id,
                user.email,
                "customer"
            );

            const accessTokenName = "customer_access_token"
            const refreshTokenName = "customer_refresh_token"

            setAuthCookies(
                res,
                tokens.accessToken,
                tokens.refreshToken,
                accessTokenName,
                refreshTokenName
            );

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
                user: user,
            });
        } catch (error) {
            next(error)
        }
    }

    handleRefreshToken(req: Request, res: Response, next: NextFunction): void {
        try {
            const refreshToken = req.user?.refresh_token;
            const newTokens = this._refreshToken.execute(refreshToken);
            const accessTokenName = `${newTokens.role}_access_token`;
            updateCookieWithAccessToken(
                res,
                newTokens.accessToken,
                accessTokenName
            )
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.OPERATION_SUCCESS,
            });
        } catch (error) {
            clearAuthCookies(
                res,
                `${req.user?.role}_access_token`,
                `${req.user?.role}_refresh_token`
            )
            next(error)
        }
    }
}