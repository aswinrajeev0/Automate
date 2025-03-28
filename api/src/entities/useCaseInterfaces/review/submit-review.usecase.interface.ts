import { IWorkshopReviewEntity } from "../../models/review.entity";

export interface ISubmitReviewUseCase {
    execute(customerId: string, data: Partial<IWorkshopReviewEntity>): Promise<void>
}