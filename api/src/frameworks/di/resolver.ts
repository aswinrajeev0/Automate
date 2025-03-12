import { container } from "tsyringe";
import { DependencyInjection } from ".";

import { CustomerRegisterController } from "@/interface-adapters/controllers/customer/customer-register.controller";

DependencyInjection.registerAll();

export const customerRegisterController = container.resolve(CustomerRegisterController);