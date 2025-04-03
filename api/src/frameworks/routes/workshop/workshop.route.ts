import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { blockStatusMiddleware, otpController, requestController, reviewController, workshopController } from "../../di/resolver";
import { authenticate, decodeToken } from "../../../interface-adapters/middlewares/auth.midleware";

export class WorkshopRoute extends BaseRoute {
    constructor() {
        super();
    }

    protected initializeRoute(): void {
        this.router.post("/sign-up", (req, res, next) => {
            workshopController.signup(req, res, next);
        });

        this.router.post("/send-otp", (req, res, next) => {
            otpController.sendOtp(req, res, next);
        });

        this.router.post("/verify-otp", (req, res, next) => {
            otpController.verifyOtp(req, res, next);
        });

        this.router.post("/login", (req, res, next) => {
            workshopController.login(req, res, next);
        });

        this.router.post("/reset-password-otp", (req, res, next) => {
            workshopController.resetPasswordOtp(req, res, next);
        });

        this.router.patch("/reset-password", (req, res, next) => {
            workshopController.resetPassword(req, res, next);
        });

        // Apply authentication & block status check to all routes below
        this.router.use(authenticate("workshop"));
        this.router.use(blockStatusMiddleware.checkStatus("workshop"));

        this.router.post("/logout", (req, res, next) => {
            workshopController.logout(req, res, next);
        });

        this.router.post("/refresh-token", decodeToken("workshop"), (req, res, next) => {
            workshopController.handleRefreshToken(req, res, next);
        });

        this.router.get("/workshop-address", (req, res, next) => {
            workshopController.getWorkshopAddress(req, res, next);
        });

        this.router.put("/update-workshop", (req, res, next) => {
            workshopController.updateWorkshop(req, res, next);
        });

        this.router.put("/edit-address", (req, res, next) => {
            workshopController.editAddress(req, res, next);
        });

        this.router.patch("/change-password", (req, res, next) => {
            workshopController.changePassword(req, res, next);
        });

        this.router.get("/all-pending-requests", (req, res, next) => {
            requestController.allPendingRequests(req, res, next);
        });

        this.router.get("/request-details/:requestId", (req, res, next) => {
            requestController.requestDetails(req, res, next);
        });

        this.router.patch("/accept-request/:requestId", (req, res, next) => {
            requestController.acceptRequest(req, res, next);
        });

        this.router.patch("/reject-request/:requestId", (req, res, next) => {
            requestController.rejectRequest(req, res, next);
        });

        this.router.get("/pending-jobs", (req, res, next) => {
            requestController.pendingJobs(req, res, next);
        });

        this.router.patch("/update-request-status", (req, res, next) => {
            requestController.updateRequestStatus(req, res, next);
        });

        this.router.get("/workshop-reviews", (req, res, next) => {
            reviewController.getWorkshopReviews(req, res, next);
        });

        this.router.get("/finished-jobs", (req, res, next) => {
            requestController.finishedJobs(req, res, next)
        })
    }
}
