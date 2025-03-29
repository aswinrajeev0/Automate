import { Request, Response, NextFunction } from "express";
import { IReviewController } from "../../entities/controllerInterfaces/review-controller.interface";
import { inject, injectable } from "tsyringe";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { ISubmitReviewUseCase } from "../../entities/useCaseInterfaces/review/submit-review.usecase.interface";

@injectable()
export class ReviewController implements IReviewController {
    constructor(
        @inject("ISubmitReviewUseCase") private _submitReview: ISubmitReviewUseCase
    ) { }
    async submitReview(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const customerId = req.user?.id;
            const data = req.body;

            if (!customerId) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    success: false,
                    message: ERROR_MESSAGES.USER_NOT_FOUND
                })
                return
            }

            if (!data || !data.workshopId || !data.rating) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.DATA_MISSING
                })
                return
            }

            const review = await this._submitReview.execute(customerId, data);

            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: SUCCESS_MESSAGES.CREATED,
                review: {
                    id: review.reviewId,
                    comment: review.comment,
                    createdAt: review.createdAt,
                    rating: review.rating,
                    updatedAt: review.updatedAt,
                    userId: review.userId,
                    workshopId: review.workshopId
                }
            })
        } catch (error) {
            next(error)
        }
    }
}