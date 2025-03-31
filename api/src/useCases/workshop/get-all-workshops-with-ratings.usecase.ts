import { inject, injectable } from "tsyringe";
import { IGetAllWorkshopsWithRatingUseCase } from "../../entities/useCaseInterfaces/workshop/get-all-workshops-with-rating.usecase.interface";
import { IWorkshopWithRatings } from "../../entities/models/workshop-with-rating.entity";
import { IWorkshopRepository } from "../../entities/repositoryInterfaces/workshop/workshop-repository.interface";
import { ReviewModel } from "../../frameworks/database/mongoDB/models/review.model";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class GetAllWorkshopsWithRatingUseCase implements IGetAllWorkshopsWithRatingUseCase {
    constructor(
        @inject("IWorkshopRepository") private _workshopRepo: IWorkshopRepository
    ) { }

    async execute(page: number, limit: number, searchTerm?: string): Promise<Partial<IWorkshopWithRatings[]>> {
        const skip = (page - 1) * limit;
        const workshops = await this._workshopRepo.getWorkshopsWithRatings(skip, limit, searchTerm)
        if(!workshops) {
            throw new CustomError(
                ERROR_MESSAGES.WORKSHOP_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }
        const length = workshops.length;
        return {workshops, length}
    }
}