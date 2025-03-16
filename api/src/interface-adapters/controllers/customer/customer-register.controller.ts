import { inject, injectable } from "tsyringe";
import { ICustomerRegisterUseCase } from "../../../entities/useCaseInterfaces/auth/register-usecase.interface";
import { Request, Response } from "express";
import { CustomerDTO } from "../../../shared/dtos/auth.dto";
import { customerSchema } from "../validations/customer-signup.validation.schema";
import {
	ERROR_MESSAGES,
	HTTP_STATUS,
	SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { ZodError } from "zod";
import { CustomError } from "../../../entities/utils/custom.error";
import { IRegisterController } from "../../../entities/controllerInterfaces/customer/register-controller.interface";

@injectable()
export class CustomerRegisterController implements IRegisterController {
	constructor(
		@inject("ICustomerRegisterUseCase")
		private customerRegisterUseCase: ICustomerRegisterUseCase
	) {}
	async handle(req: Request, res: Response): Promise<void> {
		try {
			const schema = customerSchema
			// if (!schema) {
			// 	res.status(HTTP_STATUS.BAD_REQUEST).json({
			// 		success: false,
			// 		message: ERROR_MESSAGES.INVALID_CREDENTIALS,
			// 	});
			// 	return;
			// }
			const validatedData = schema.parse(req.body);
			await this.customerRegisterUseCase.execute(validatedData);
			res.status(HTTP_STATUS.CREATED).json({
				success: true,
				message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
			});
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.errors.map((err) => ({
					message: err.message,
				}));

				console.error(error)

				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: ERROR_MESSAGES.VALIDATION_ERROR,
					errors,
				});
				return;
			}
			if (error instanceof CustomError) {
				console.error(error)
				res.status(error.statusCode).json({
					success: false,
					message: error.message,
				});
				return;
			}
			console.log("Error at Register-controller", error);
			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: ERROR_MESSAGES.SERVER_ERROR,
			});
		}
	}
}
