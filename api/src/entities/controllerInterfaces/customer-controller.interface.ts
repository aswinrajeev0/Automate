import { Request, Response } from "express";

export interface ICustomerController {
    getAllCustomers(req: Request, res: Response): Promise<void>;
}