import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "../base.route";
import {
    blockStatusMiddleware,
    bookingController,
    customerController,
    otpController,
    paymentController,
    requestController,
    reviewController,
    walletController,
    workshopController
} from "../../di/resolver";
import { authenticate, decodeToken } from "../../../interface-adapters/middlewares/auth.midleware";

export class CustomerRoute extends BaseRoute {
    constructor() {
        super();
    }

    protected initializeRoute(): void {

        this.router.use(decodeToken("customer"))
        // this.router.use(blockStatusMiddleware.checkStatus("customer"))

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

        this.router.put("/update-customer", authenticate("customer"), blockStatusMiddleware.checkStatus("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.editCustomer(req, res, next)
        })

        this.router.delete("/delete-customer", decodeToken("customer"), blockStatusMiddleware.checkStatus("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.deleteCustomer(req, res, next)
        })

        this.router.get("/customer-address", authenticate("customer"), blockStatusMiddleware.checkStatus("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.getCustomerAddress(req, res, next)
        })

        this.router.put("/edit-address", authenticate("customer"), blockStatusMiddleware.checkStatus("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.editAddress(req, res, next)
        })

        this.router.patch("/change-password", authenticate("customer"), blockStatusMiddleware.checkStatus("customer"), (req: Request, res: Response, next: NextFunction) => {
            customerController.changePassword(req, res, next)
        })

        this.router.post("/submit-review", authenticate("customer"), blockStatusMiddleware.checkStatus("customer"), (req: Request, res: Response, next: NextFunction) => {
            reviewController.submitReview(req, res, next)
        })

        this.router.get("/booked-slots/:workshopId", authenticate("customer"), blockStatusMiddleware.checkStatus("customer"), (req: Request, res: Response, next: NextFunction) => {
            bookingController.getBookedSlots(req, res, next)
        })

        this.router.post("/book-slot", authenticate("customer"), blockStatusMiddleware.checkStatus("customer"), (req: Request, res: Response, next: NextFunction) => {
            bookingController.bookSlot(req, res, next);
        })

        this.router.post("/car-lift", authenticate("customer"), blockStatusMiddleware.checkStatus("customer"), (req: Request, res: Response, next: NextFunction) => {
            requestController.carLift(req, res, next)
        })

        this.router.post("/mobile-workshop", authenticate("customer"), blockStatusMiddleware.checkStatus("customer"), (req: Request, res: Response, next: NextFunction) => {
            requestController.mobileWorkshop(req, res, next)
        })

        this.router.delete("/cancel-slot/:bookingId", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            bookingController.cancelslot(req, res, next)
        })

        this.router.post("/create-order", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            paymentController.createOrder(req, res, next)
        })

        this.router.post("/verify-payment", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            paymentController.verifyPayment(req, res, next)
        })

        this.router.get("/wallet", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            walletController.getWallet(req, res, next);
        })

        this.router.post("/add-money", authenticate("customer"), (req: Request, res: Response, next: NextFunction) => {
            walletController.addMoney(req, res, next);
        })
    }
}