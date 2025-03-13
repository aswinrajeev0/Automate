import { container } from "tsyringe";

import { CustomerRegisterController } from "../../interface-adapters/controllers/customer/customer-register.controller";
import { SendOtpController } from "../../interface-adapters/controllers/send-otp.controller";

export class ControllerRegistry {
    static registerController(): void {
        container.register("RegisterUserController", {
            useClass: CustomerRegisterController
        });

        container.register("SendOtpEmailController", {
            useClass: SendOtpController,
        });
    }
}