import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { adminController, customerController, workshopController } from "../../di/resolver";


export class AdminRoute extends BaseRoute {

    constructor() {
        super();
    }

    protected initializeRoute(): void {
        this.router.post('/login', (req: Request, res: Response) => {
            adminController.login(req, res);
        })

        this.router.get("/customers", (req: Request, res: Response) => {
            customerController.getAllCustomers(req, res);
        })

        this.router.patch("/customer-status/:userId", (req: Request, res: Response) => {
            customerController.updateCustomerStatus(req, res);
        })

        this.router.get("/workshops", (req: Request, res: Response) => {
            workshopController
        })

        this.router.patch("workshop-status/:workshopId", (req: Request, res: Response) => {
            workshopController
        })
    }
}