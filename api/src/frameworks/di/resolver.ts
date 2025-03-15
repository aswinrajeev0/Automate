import { container } from "tsyringe";
import { DependencyInjection } from ".";

import { CustomerRegisterController } from "../../interface-adapters/controllers/customer/customer-register.controller";
import { SendOtpController } from "../../interface-adapters/controllers/send-otp.controller";
import { VerifyOtpController } from "../../interface-adapters/controllers/verify-otp.controller";
import { LoginCustomerController } from "../../interface-adapters/controllers/customer/customer-login.controller";
import { AdminController } from "../../interface-adapters/controllers/admin.controller"
import { CustomerController } from "../../interface-adapters/controllers/customer.controller";

DependencyInjection.registerAll();

export const customerRegisterController = container.resolve(CustomerRegisterController);
export const sendOtpController = container.resolve(SendOtpController);
export const verifyOtpController = container.resolve(VerifyOtpController);
export const loginCustomerController = container.resolve(LoginCustomerController);
export const adminController = container.resolve(AdminController);
export const customerController = container.resolve(CustomerController)