import { NextFunction, Request, Response } from "express";
import { IAdminController } from "../../entities/controllerInterfaces/admin-controller.interface";
import { injectable, inject } from "tsyringe";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/generatetoken.usecase.interface";
import { IAdminLoginUseCase } from "../../entities/useCaseInterfaces/admin/admin-login-usecase.interface";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { clearAuthCookies, setAuthCookies, updateCookieWithAccessToken } from "../../shared/utils/cookie-helper";
import { IAdminLogoutUseCase } from "../../entities/useCaseInterfaces/admin/admin-logout.usecase.interface";
import { IRefreshTokenUseCase } from "../../entities/useCaseInterfaces/admin/admin-refresh-token.usecase.interface";
import { tryCatch } from "bullmq";

@injectable()
export class AdminController implements IAdminController {
    constructor(
        @inject("IAdminLoginUseCase") private _adminLogin: IAdminLoginUseCase,
        @inject("IGenerateTokenUseCase") private _generateToken: IGenerateTokenUseCase,
        @inject("IAdminLogoutUseCase") private _adminLogoutuseCase: IAdminLogoutUseCase,
        @inject("IRefreshTokenUseCase") private _refreshToken: IRefreshTokenUseCase
    ) { }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body
            const admin = await this._adminLogin.execute(data);
            if (!admin.email || !admin.id) {
                throw new Error("Admin id or email is missing.")
            }

            const tokens = await this._generateToken.execute(
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
                    image: admin?.image
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

            await this._adminLogoutuseCase.execute(req.user)
            clearAuthCookies(res, "admin_access_token", "admin_refresh_token")
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
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