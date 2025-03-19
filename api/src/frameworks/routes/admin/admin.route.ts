import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { adminController, customerController, workshopController } from "../../di/resolver";
import { authenticate } from "../../../interface-adapters/middlewares/auth.midleware";


export class AdminRoute extends BaseRoute {

    constructor() {
        super();
    }

    protected initializeRoute(): void {
        this.router.post('/login', (req: Request, res: Response, next: NextFunction) => {
            adminController.login(req, res, next);
        })

        this.router.get("/customers", authenticate("admin"), (req: Request, res: Response, next: NextFunction) => {
            customerController.getAllCustomers(req, res, next);
        })

        this.router.patch("/customer-status/:userId", authenticate("admin"), (req: Request, res: Response, next: NextFunction) => {
            customerController.updateCustomerStatus(req, res, next);
        })

        this.router.get("/workshops", authenticate("admin"), (req: Request, res: Response, next: NextFunction) => {
            workshopController.getAllWorkshops(req, res, next);
        })

        this.router.patch("/workshop-status/:workshopId", authenticate("admin"), (req: Request, res: Response, next: NextFunction) => {
            workshopController.updateWorkshopStatus(req, res, next);
        })

        this.router.post("/logout", authenticate("admin"), (req: Request, res: Response, next: NextFunction) => {
            adminController.logout(req, res, next);
        })

        this.router.patch("/workshop-approval", authenticate("admin"), (req: Request, res: Response, next: NextFunction) => {
            workshopController.updateWorkshopApprovalStatus(req, res, next);
        })
    }
}