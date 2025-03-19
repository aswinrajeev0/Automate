import { NextFunction, Request, Response } from "express";

export interface ICustomerController {
    signup(req: Request, res: Response, next: NextFunction): Promise<void>
    login(req: Request, res: Response, next: NextFunction): Promise<void>
    getAllCustomers(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateCustomerStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    resetPasswordOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
    resetPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
    googleAuth(req: Request, res: Response, next: NextFunction) : Promise<void>;
}