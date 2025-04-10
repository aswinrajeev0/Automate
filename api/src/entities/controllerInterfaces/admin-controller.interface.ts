import { NextFunction, Request, Response } from "express";

export interface IAdminController {
    login(req: Request, res: Response, next: NextFunction): Promise<void>
    logout(req: Request, res: Response, next: NextFunction): Promise<void>
    handleRefreshToken(req: Request, res: Response, next: NextFunction): void;
}