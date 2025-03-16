import { container } from "tsyringe";

import { CustomerRegisterController } from "../../interface-adapters/controllers/customer/customer-register.controller";
import { SendOtpController } from "../../interface-adapters/controllers/send-otp.controller";
import { VerifyOtpController } from "../../interface-adapters/controllers/verify-otp.controller";
import { LoginCustomerController } from "../../interface-adapters/controllers/customer/customer-login.controller";
import { AdminController } from "../../interface-adapters/controllers/admin.controller";
import { CustomerController } from "../../interface-adapters/controllers/customer.controller";
import { WorkshopController } from "../../interface-adapters/controllers/workshop.controller";

export class ControllerRegistry {
    static registerController(): void {
        container.register("RegisterUserController", {
            useClass: CustomerRegisterController
        });

        container.register("SendOtpEmailController", {
            useClass: SendOtpController,
        });

        container.register("VerifyOtpController", {
            useClass: VerifyOtpController
        })

        container.register("LoginCustomerController", {
            useClass: LoginCustomerController
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