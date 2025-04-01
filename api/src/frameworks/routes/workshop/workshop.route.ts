import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { otpController, requestController, reviewController, workshopController } from "../../di/resolver";
import { authenticate, decodeToken } from "../../../interface-adapters/middlewares/auth.midleware";

export class WorkshopRoute extends BaseRoute {
    constructor() {
        super();
    }

    protected initializeRoute(): void {
        this.router.post("/sign-up", (req: Request, res: Response, next: NextFunction) => {
            workshopController.signup(req, res, next)
        })

        this.router.post("/send-otp", (req: Request, res: Response, next: NextFunction) => {
            otpController.sendOtp(req, res, next);
        })

        this.router.post("/verify-otp", (req: Request, res: Response, next: NextFunction) => {
            otpController.verifyOtp(req, res, next)
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

        this.router.post("/refresh-token", decodeToken("workshop"), (req: Request, res: Response, next: NextFunction) => {
            workshopController.handleRefreshToken(req, res, next)
        })

        this.router.get("/workshop-address", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            workshopController.getWorkshopAddress(req, res, next)
        })

        this.router.put("/update-workshop", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            workshopController.updateWorkshop(req, res, next)
        })

        this.router.put("/edit-address", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            workshopController.editAddress(req, res, next)
        })

        this.router.patch("/change-password", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            workshopController.changePassword(req, res, next)
        })

        this.router.get("/all-pending-requests", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            requestController.allPendingRequests(req, res, next)
        })

        this.router.get("/request-details/:requestId", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            requestController.requestDetails(req, res, next);
        })

        this.router.patch("/accept-request/:requestId", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            requestController.acceptRequest(req, res, next);
        })
        
        this.router.patch("/reject-request/:requestId", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            requestController.rejectRequest(req, res, next);
        })

        this.router.get("/pending-jobs", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            requestController.pendingJobs(req, res, next)
        })

        this.router.patch("/update-request-status", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            requestController.updateRequestStatus(req, res, next);
        })

        this.router.get("/workshop-reviews", authenticate("workshop"), (req: Request, res: Response, next: NextFunction) => {
            reviewController.getWorkshopReviews(req, res, next)
        })
    }
}