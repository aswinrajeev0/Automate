import { inject, injectable } from "tsyringe";
import { IRequestController } from "../../entities/controllerInterfaces/request-controller.interface";
import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { ICarLiftRequestUseCase } from "../../entities/useCaseInterfaces/requests/carlift-request.usecase.interface";
import { carLiftRequestValidationSchema, mobileWorkshopRequestValidationSchema } from "./validations/request.validation";
import { IMobileWorkshopRequestUseCase } from "../../entities/useCaseInterfaces/requests/mobileworkshop-request.usecase.interface";

@injectable()
export class RequestController implements IRequestController {
    constructor(
        @inject("ICarLiftRequestUseCase") private _carLiftRequest: ICarLiftRequestUseCase,
        @inject("IMobileWorkshopRequestUseCase") private _mobileWorkshop: IMobileWorkshopRequestUseCase
    ) { }

    async carLift(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const customerId = req.user?.id;
            const data = req.body
            const { workshopId, image } = data.workshopId;
            if (!customerId) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    success: false,
                    message: ERROR_MESSAGES.INVALID_ROLE
                })
                return
            }

            const schema = carLiftRequestValidationSchema

            const validatedData = schema.parse(data)

            const request = await this._carLiftRequest.execute({ ...validatedData, customerId, workshopId, image })

            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: SUCCESS_MESSAGES.BOOKING_SUCCESS,
                request
            })

        } catch (error) {
            next(error)
        }
    }

    async mobileWorkshop(req: Request, res: Response, next: NextFunction): Promise<void> {
        const customerId = req.user?.id;
        const data = req.body;
        const { workshopId } = data;
        if (!customerId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success: false,
                message: ERROR_MESSAGES.INVALID_ROLE
            })
            return
        }

        const schema = mobileWorkshopRequestValidationSchema;
        const validatedData = schema.parse(data)

        const request = await this._mobileWorkshop.execute({...validatedData, workshopId, customerId})
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: SUCCESS_MESSAGES.BOOKING_SUCCESS,
            request
        })
    }
}