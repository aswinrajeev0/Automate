import { container } from "tsyringe";

import { SendOtpController } from "../../interface-adapters/controllers/send-otp.controller";
import { VerifyOtpController } from "../../interface-adapters/controllers/verify-otp.controller";
import { AdminController } from "../../interface-adapters/controllers/admin.controller";
import { CustomerController } from "../../interface-adapters/controllers/customer.controller";
import { WorkshopController } from "../../interface-adapters/controllers/workshop.controller";

export class ControllerRegistry {
    static registerController(): void {

        container.register("SendOtpEmailController", {
            useClass: SendOtpController,
        });

        container.register("VerifyOtpController", {
            useClass: VerifyOtpController
        })

        container.register("AdminController", {
            useClass: AdminController
        })

        container.register("CustomerController", {
            useClass: CustomerController
        })

        container.register("WorkshopController", {
            useClass: WorkshopController
        })
    }
}