import { inject, injectable } from "tsyringe";
import { IWorkshopDetailsUseCase } from "../../entities/useCaseInterfaces/workshop/workshop-details.usecase.interface";
import { IWorkshopEntity } from "../../entities/models/workshop.entity";
import { IWorkshopRepository } from "../../entities/repositoryInterfaces/workshop/workshop-repository.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IReviewRepository } from "../../entities/repositoryInterfaces/review/review-repository.interface";
import { IWorkshopReviewEntity } from "../../entities/models/review.entity";


@injectable()
export class WorkshopDetailsUseCase implements IWorkshopDetailsUseCase {
    constructor(
        @inject("IWorkshopRepository") private _workshopRepo: IWorkshopRepository,
        @inject("IReviewRepository") private _reviewRepo: IReviewRepository
    ) { }

    async execute(id: string): Promise<{ workshop: Partial<IWorkshopEntity>; reviews: IWorkshopReviewEntity[] }> {
        const workshop = await this._workshopRepo.findById(id);
        if (!workshop) {
            throw new CustomError(
                ERROR_MESSAGES.WORKSHOP_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        const reviews = await this._reviewRepo.find({ workshopId: id }) || []

        return {
            workshop: {
                name: workshop.name,
                phone: workshop.phone,
                id: workshop.id,
                workshopId: workshop.workshopId,
                country: workshop.country,
                state: workshop.state,
                city: workshop.city,
                streetAddress: workshop.streetAddress,
                buildingNo: workshop.buildingNo,
                bio: workshop.bio,
                image: workshop.image,
            },
            reviews: reviews.map(review => ({
                reviewId: review.reviewId,
                workshopId: review.workshopId.toString(),
                userId: review.userId.toString(),
                rating: review.rating,
                comment: review.comment,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
            }))
        }
    }
}