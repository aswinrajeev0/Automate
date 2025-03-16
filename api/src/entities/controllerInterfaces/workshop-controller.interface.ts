import { Request, Response } from "express";

export interface IWorkshopController {
    signup(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    getAllWorkshops(req: Request, res: Response): Promise<void>;
    updateWorkshopStatus(req: Request, res: Response): Promise<void>;
}