import { NextFunction, Request, Response } from "express";

export interface IWorkshopController {
    signup(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllWorkshops(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateWorkshopStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    resetPasswordOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
    resetPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateWorkshopApprovalStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    handleRefreshToken(req: Request, res: Response, next: NextFunction): void;
    getFeaturedWorkshops(req: Request, res: Response, next: NextFunction): Promise<void>;
}