import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "../base.route";
import {
    bookingController,
    customerController,
    otpController,
    reviewController,
    workshopController
} from "../../di/resolver";
import { authenticate, decodeToken } from "../../../interface-adapters/middlewares/auth.midleware";

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

        this.router.post("/reset-password-otp", (req: Request, res: Response, next: NextFunction) => {
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

        this.router.post("/refresh-token", decodeToken("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.handleRefreshToken(req, res, next)
        })

        this.router.get("/workshops/featured", (req: Request, res: Response, next: NextFunction) => {
            workshopController.getFeaturedWorkshops(req, res, next);
        })

        this.router.put("/update-customer", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.editCustomer(req, res, next)
        })

        this.router.delete("/delete-customer", decodeToken("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.deleteCustomer(req, res, next)
        })

        this.router.get("/customer-address", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.getCustomerAddress(req, res, next)
        })

        this.router.put("/edit-address", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.editAddress(req, res, next)
        })

        this.router.patch("/change-password", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.changePassword(req, res, next)
        })

        this.router.get("/workshop-details/:id", (req: Request, res: Response, next: NextFunction) => {
            workshopController.getWorkshopDetails(req, res, next)
        })

        this.router.post("/submit-review", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            reviewController.submitReview(req, res, next)
        })

        this.router.get("/booked-slots/:workshopId", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            bookingController.getBookedSlots(req, res, next)
        })

        this.router.post("/book-slot", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            bookingController.bookSlot(req, res, next);
        })
    }
}