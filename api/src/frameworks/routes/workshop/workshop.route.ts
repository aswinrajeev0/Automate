import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { sendOtpController, verifyOtpController, workshopController } from "../../di/resolver";
import { authenticate } from "../../../interface-adapters/middlewares/auth.midleware";

export class WorkshopRoute extends BaseRoute {
    constructor() {
        super();
    }

    protected initializeRoute(): void {
        this.router.post("/sign-up", (req: Request, res: Response, next: NextFunction) => {
            workshopController.signup(req, res, next)
        })

        this.router.post("/send-otp", (req: Request, res: Response, next: NextFunction) => {
            sendOtpController.handle(req, res, next);
        })

        this.router.post("/verify-otp", (req: Request, res: Response, next: NextFunction) => {
            verifyOtpController.handle(req,res, next)
        })

        this.router.post("/login", (req: Request, res: Response, next: NextFunction) => {
            workshopController.login(req, res, next)
        })

        this.router.post("/reset-password-otp", (req: Request, res: Response, next: NextFunction) => {
            workshopController.resetPasswordOtp(req, res, next)
        })

        this.router.patch("/reset-password", (req: Request, res: Response, next: NextFunction) => {
            workshopController.resetPassword(req, res, next)
        })

        this.router.post("/logout", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            workshopController.logout(req, res, next)
        })
    }
}