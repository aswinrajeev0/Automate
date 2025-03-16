import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { sendOtpController, verifyOtpController, workshopController } from "../../di/resolver";

export class WorkshopRoute extends BaseRoute {
    constructor() {
        super();
    }

    protected initializeRoute(): void {
        this.router.post("/sign-up", (req: Request, res: Response) => {
            workshopController.signup(req, res)
        })

        this.router.post("/send-otp", (req: Request, res: Response) => {
            sendOtpController.handle(req, res);
        })

        this.router.post("/verify-otp", (req: Request, res: Response) => {
            verifyOtpController.handle(req,res)
        })

        this.router.post("/login", (req: Request, res: Response) => {
            workshopController.login(req, res)
        })
    }
}