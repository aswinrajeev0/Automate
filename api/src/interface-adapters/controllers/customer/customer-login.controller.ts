import { inject, injectable } from "tsyringe";
import { ILoginController } from "../../../entities/controllerInterfaces/customer/login-controller.interface";
import { ILoginCustomerUseCase } from "../../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { IGenerateTokenUseCase } from "../../../entities/useCaseInterfaces/generatetoken.usecase.interface";
import { CustomError } from "../../../entities/utils/custom.error";
import { loginSchema } from "../validations/customer-login.validation.schema";
import {
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    HTTP_STATUS
} from "../../../shared/constants";
import { ZodError } from "zod";
import { Request, Response } from "express";
import { setAuthCookies } from "../../../shared/utils/cookie-helper";

@injectable()
export class LoginCustomerController implements ILoginController {
    constructor(
        @inject("ILoginCustomerUseCase")
        private loginCustomer: ILoginCustomerUseCase,
        @inject("IGenerateTokenUseCase")
        private generateTokenUseCase: IGenerateTokenUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const user = await this.loginCustomer.execute(data)
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

            if(error instanceof CustomError){
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
                return;
            }

            console.log("Error at login controller", error)
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES.SERVER_ERROR
            });
        }
    }
}