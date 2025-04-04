import { NextFunction, Request, Response } from "express";
import { IAdminController } from "../../entities/controllerInterfaces/admin-controller.interface";
import { injectable, inject } from "tsyringe";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/generatetoken.usecase.interface";
import { IAdminLoginUseCase } from "../../entities/useCaseInterfaces/admin/admin-login-usecase.interface";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { clearAuthCookies, setAuthCookies } from "../../shared/utils/cookie-helper";
import { IAdminLogoutUseCase } from "../../entities/useCaseInterfaces/admin/admin-logout.usecase.interface";

@injectable()
export class AdminController implements IAdminController {
    constructor(
        @inject("IAdminLoginUseCase") private adminLogin: IAdminLoginUseCase,
        @inject("IGenerateTokenUseCase") private generateToken: IGenerateTokenUseCase,
        @inject("IAdminLogoutUseCase") private adminLogoutuseCase: IAdminLogoutUseCase
    ) { }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
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

            await this.adminLogoutuseCase.execute(req.user)
            clearAuthCookies(res, "admin_access_token", "admin_refresh_token")
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
            });
        } catch (error) {
            next(error)
        }
    }
}