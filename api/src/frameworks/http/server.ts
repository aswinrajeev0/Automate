import cors from "cors";
import helmet from "helmet";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { config } from "../../shared/config";

import { CustomerRoute } from "../routes/customer/customer.route";
import { AdminRoute } from "../routes/admin/admin.route";

export class Server {
    private _app: Application;
    constructor() {
        this._app = express();
        this.configureMiddlewares();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    private configureMiddlewares() {
        this._app.use(morgan(config.loggerStatus));
        this._app.use(helmet());
        this._app.use(cors({
            origin: config.cors.ALLOWED_ORIGIN,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Authorization', 'Content-Type'],
            credentials: true
        }));
        this._app.use((req: Request, res: Response, next: NextFunction) => {
            express.json()(req, res, next);
        });
        this._app.use(cookieParser());
        this._app.use(rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 1000
        }));
    }

    private configureRoutes() {
        this._app.use('/api/v1/customer/', new CustomerRoute().router);
        this._app.use('/api/v1/admin/', new AdminRoute().router);
        // this._app.use('/api/v1/workshop/', new AuthRoutes().router);
        // this._app.use("*", notFound);
    }

    private configureErrorHandling() {

    }

    public getApp():Application{
        return this._app;
    }
}