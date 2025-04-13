import { NextFunction, Request, Response } from "express";

export interface IChatController {
    getConversations(req: Request, res: Response, next: NextFunction): Promise<void>;
}