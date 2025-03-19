import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "../base.route";
import {
    customerController,
    otpController
} from "../../di/resolver";
import { authenticate } from "../../../interface-adapters/middlewares/auth.midleware";

export class CustomerRoute extends BaseRoute {
    constructor() {
        super();
    }

    protected initializeRoute(): void {
        this.router.post('/sign-up', (req: Request, res: Response, next: NextFunction) => {
            customerController.signup(req, res, next);
        })

        this.router.post('/send-otp', (req: Request, res: Response, next: NextFunction) => {
            otpController.sendOtp(req, res, next);
        })

        this.router.post('/verify-otp', (req: Request, res: Response, next: NextFunction) => {
            otpController.verifyOtp(req, res, next);
        })

        this.router.post('/login', (req: Request, res: Response, next: NextFunction) => {
            customerController.login(req, res, next);
        })

        this.router.post("/reset-password-otp", (req:Request, res: Response, next: NextFunction) => {
            customerController.resetPasswordOtp(req, res, next);
        })

        this.router.patch("/reset-password", (req: Request, res: Response, next: NextFunction) => {
            customerController.resetPassword(req, res, next);
        })

        this.router.post("/logout", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.logout(req, res, next);
        })

        this.router.post("/google-auth", (req: Request, res: Response, next: NextFunction) => {
            customerController.googleAuth(req, res, next);
        })
    }
}