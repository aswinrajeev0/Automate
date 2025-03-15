import { Request, Response } from "express";
import { IAdminController } from "../../entities/controllerInterfaces/admin-controller.interface";
import { injectable, inject } from "tsyringe";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/generatetoken.usecase.interface";
import { IAdminLoginUseCase } from "../../entities/useCaseInterfaces/admin/admin-login-usecase.interface";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { setAuthCookies } from "../../shared/utils/cookie-helper";
import { ZodError } from "zod";
import { CustomError } from "../../entities/utils/custom.error";

@injectable()
export class AdminController implements IAdminController {
    constructor(
        @inject("IAdminLoginUseCase")
        private adminLogin: IAdminLoginUseCase,
        @inject("IGenerateTokenUseCase")
        private generateToken: IGenerateTokenUseCase
    ) { }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const admin = await this.adminLogin.execute(data);
            if (!admin.email || !admin.id) {
                throw new Error("Admin id or email is missing.")
            }

            const tokens = await this.generateToken.execute(
                admin.id,
                admin.email,
                "admin"
            )

            const accessTokenName = "admin_access_token";
            const refreshTokenName = "admin_refresh_token";

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
                admin: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    image: admin?.profileImage
                }
            })
        } catch (error) {
            if(error instanceof ZodError) {
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
                });
                return;
            }

            console.error("Error at admin login controller", error)
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES.SERVER_ERROR
            });
        }
    }
}