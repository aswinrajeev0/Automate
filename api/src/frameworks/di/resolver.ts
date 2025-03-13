import { container } from "tsyringe";
import { DependencyInjection } from ".";

import { CustomerRegisterController } from "../../interface-adapters/controllers/customer/customer-register.controller";
import { SendOtpController } from "../../interface-adapters/controllers/send-otp.controller";

DependencyInjection.registerAll();

export const customerRegisterController = container.resolve(CustomerRegisterController);
export const sendOtpController = container.resolve(SendOtpController)