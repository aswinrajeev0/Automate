import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, ERROR_MESSAGES } from "../../shared/constants";
import { JWTService } from "../services/jwt-service";
import { JwtPayload } from "jsonwebtoken";

const tokenService = new JWTService()

export interface UserRequest {
    id: string;
    email: string;
    role: "customer" | "workshop" | "admin";
    access_token: string;
    refresh_token: string;
}

export const authenticate =
    (role: "customer" | "workshop" | "admin") =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const accessToken = req.cookies[`${role}_access_token`];
                const refreshToken = req.cookies[`${role}_refresh_token`]

                if (!accessToken) {
                    res.status(HTTP_STATUS.UNAUTHORIZED).json({
                        success: false,
                        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
                    });
                    return;
                }

                const decoded = tokenService.decodeAccessToken(accessToken)

                if (!decoded) {
                    res.status(HTTP_STATUS.FORBIDDEN).json({
                        success: false,
                        message: ERROR_MESSAGES.INVALID_TOKEN
                    })
                    return;
                }

                decoded.access_token = accessToken
                decoded.refresh_token = refreshToken

                if (typeof decoded === "object" && "id" in decoded && "email" in decoded && "role" in decoded) {
                    req.user = decoded as UserRequest;

                    if (req.user.role !== role) {
                        res.status(HTTP_STATUS.FORBIDDEN).json({
                            success: false,
                            message: ERROR_MESSAGES.FORBIDDEN,
                        });
                        return;
                    }

                    return next();
                } else {
                    res.status(HTTP_STATUS.FORBIDDEN).json({
                        success: false,
                        message: ERROR_MESSAGES.FORBIDDEN,
                    });
                    return;
                }
            } catch (err) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    success: false,
                    message: ERROR_MESSAGES.INVALID_TOKEN,
                });
                return;
            }
        };
