import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { customerRegisterController } from "@/frameworks/di/resolver";

export class AuthRoutes extends BaseRoute {
    constructor() {
        super();
    }

    protected initializeRoute(): void {
        this.router.post('/sign-up', (req: Request, res: Response) => {
            customerRegisterController.handle(req, res);
        })

        this.router.post('/send-otp', (req: Request, res: Response) => {
            
        })
    }
}