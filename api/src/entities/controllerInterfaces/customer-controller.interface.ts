import { Request, Response } from "express";

export interface ICustomerController {
    getAllCustomers(req: Request, res: Response): Promise<void>;
    updateCustomerStatus(req: Request, res: Response): Promise<void>;
    resetPasswordOtp(req: Request, res: Response): Promise<void>;
    resetPassword(req: Request, res: Response): Promise<void>;
}