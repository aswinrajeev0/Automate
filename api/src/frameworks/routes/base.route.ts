import { Router } from "express";

export abstract class BaseRoute {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoute();
    }

    protected abstract initializeRoute(): void;
}