import { container } from "tsyringe";
import { DependencyInjection } from ".";

import { SendOtpController } from "../../interface-adapters/controllers/send-otp.controller";
import { VerifyOtpController } from "../../interface-adapters/controllers/verify-otp.controller";
import { AdminController } from "../../interface-adapters/controllers/admin.controller"
import { CustomerController } from "../../interface-adapters/controllers/customer.controller";
import { WorkshopController } from "../../interface-adapters/controllers/workshop.controller";

DependencyInjection.registerAll();

export const sendOtpController = container.resolve(SendOtpController);
export const verifyOtpController = container.resolve(VerifyOtpController);
export const adminController = container.resolve(AdminController);
export const customerController = container.resolve(CustomerController)
export const workshopController = container.resolve(WorkshopController)