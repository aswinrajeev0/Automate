import { container } from "tsyringe";

import { CustomerRegisterController } from "@/interface-adapters/controllers/customer/customer-register.controller";


export class ControllerRegistry {
    static registerController(): void {
        container.register("RegisterUserController", {
            useClass: CustomerRegisterController
        });
    }
}