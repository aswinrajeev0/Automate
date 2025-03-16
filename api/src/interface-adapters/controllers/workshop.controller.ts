import { inject, injectable } from "tsyringe";
import { IWorkshopController } from "../../entities/controllerInterfaces/workshop-controller.interface";
import { Request, Response } from "express";
import { IWorkshopSignupUseCase } from "../../entities/useCaseInterfaces/workshop/workshop-signup-usecase.interface";
import { workshopSchema } from "./validations/workshop-signup.validation.schema";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { ZodError } from "zod";
import { CustomError } from "../../entities/utils/custom.error";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/generatetoken.usecase.interface";
import { setAuthCookies } from "../../shared/utils/cookie-helper";
import { IWorkshopLoginUseCase } from "../../entities/useCaseInterfaces/workshop/workshop-login-usecase.interface";
import { IGetAllWorkshopsUseCase } from "../../entities/useCaseInterfaces/workshop/get-allworkshops-usecase.interface";

@injectable()
export class WorkshopController implements IWorkshopController {
    constructor(
        @inject("IWorkshopSignupUseCase")
        private workshopSignupUseCase: IWorkshopSignupUseCase,
        @inject("IWorkshopLoginUseCase")
        private workshopLoginUseCase: IWorkshopLoginUseCase,
        @inject("IGenerateTokenUseCase")
        private generateToken: IGenerateTokenUseCase,
        @inject("IGetAllWorkshopsUseCase")
        private getAllWorkshopsUseCase: IGetAllWorkshopsUseCase
    ) { }

    async signup(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            console.log(data)
            const schema = workshopSchema
            const validatedData = schema.parse(data)
            await this.workshopSignupUseCase.execute(validatedData)
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
            });
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map(err => ({
                    message: err.message
                }))
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.VALIDATION_ERROR,
                    errors
                })
                return;
            }

            if (error instanceof CustomError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
                return;
            }
            console.error("Error in workshop register", error)
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES.SERVER_ERROR
            })
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const workshop = await this.workshopLoginUseCase.execute(data);
            if (!workshop.email || !workshop.id) {
                throw new Error("Workshop id or email is missing.")
            }

            const tokens = await this.generateToken.execute(
                workshop.id,
                workshop.email,
                "workshop"
            )

            const accessTokenName = "workshop_access_token";
            const refreshTokenName = "worokshop_refresh_token";

            setAuthCookies(
                res,
                tokens.accessToken,
                tokens.refreshToken,
                accessTokenName,
                refreshTokenName
            )

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
                workshop: {
                    id: workshop.id,
                    name: workshop.name,
                    email: workshop.email,
                    image: workshop?.image,
                    country: workshop.country,
                    state: workshop.state,
                    city: workshop.city,
                    streetAddress: workshop.streetAddress,
                    buildingNo: workshop.buildingNo
                }
            })
        } catch (error) {
            if(error instanceof ZodError){
                const errors = error.errors.map(err => ({
                    message: err.message
                }))

                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.VALIDATION_ERROR,
                    errors
                })
                return;
            }

            if(error instanceof CustomError){
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
                return;
            }

            console.error("Error in workshop login",error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES.SERVER_ERROR
            })
        }
    }

    async getAllWorkshops(req: Request, res: Response): Promise<void> {
        try {
            const { page = 1, limit = 10, search = "" } = req.query;
            const pageNumber = Number(page);
            const pageSize = Number(limit);
            const searchTermString = typeof search === "string" ? search : "";

            const { workshops, total } = await this.getAllWorkshopsUseCase.execute(
                pageNumber,
                pageSize,
                searchTermString
            );
            res.status(HTTP_STATUS.OK).json({
                success: true,
                workshops: workshops,
                totalPages: total,
                currentPage: pageNumber,
            });
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map(err => ({
                    message: err.message
                }))

                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.VALIDATION_ERROR,
                    errors
                })
                return;
            }

            if (error instanceof CustomError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }

            console.error("Error in getting all customers", error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES.SERVER_ERROR,
            });
        }
    }

    async updateWorkshopStatus(req: Request, res: Response): Promise<void> {
        
    }
}