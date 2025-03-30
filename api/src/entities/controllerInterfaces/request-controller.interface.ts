import { NextFunction, Request, Response } from "express";

export interface IRequestController {
    carLift(req: Request, res: Response, next: NextFunction): Promise<void>;
    mobileWorkshop(req: Request, res: Response, next: NextFunction): Promise<void>;
}