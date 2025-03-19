import { container } from "tsyringe";
import { DependencyInjection } from ".";

import { AdminController } from "../../interface-adapters/controllers/admin.controller"
import { CustomerController } from "../../interface-adapters/controllers/customer.controller";
import { WorkshopController } from "../../interface-adapters/controllers/workshop.controller";
import { OtpController } from "../../interface-adapters/controllers/otp.controller";

DependencyInjection.registerAll();

export const otpController = container.resolve(OtpController)
export const adminController = container.resolve(AdminController);
export const customerController = container.resolve(CustomerController)
export const workshopController = container.resolve(WorkshopController)