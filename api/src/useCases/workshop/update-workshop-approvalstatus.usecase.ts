import { injectable, inject } from "tsyringe";
import { IUpdateWorkshopApprovalStatusUseCase } from "../../entities/useCaseInterfaces/workshop/update-workshop-approvalstatus.usecase.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IWorkshopRepository } from "../../entities/repositoryInterfaces/workshop/workshop-repository.interface";
import { IWorkshopEntity } from "../../entities/models/workshop.entity";

@injectable()
export class UpdateWorkshopApprovalStatusUseCase implements IUpdateWorkshopApprovalStatusUseCase {
    constructor(
        @inject("IWorkshopRepository") private _workshopRepo: IWorkshopRepository
    ) { }

    async execute(workshopId: string, status: "approved" | "rejected" | "pending", reason?: string): Promise<IWorkshopEntity> {
        if (!workshopId || !status) {
            throw new CustomError(
                ERROR_MESSAGES.MISSING_PARAMETERS,
                HTTP_STATUS.BAD_REQUEST
            )
        }

        const updates = {
            approvalStatus: status,
            rejectionReason: reason
        }

        const workshop = await this._workshopRepo.findByIdAndUpdate(workshopId, updates)
        if (!workshop) {
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }
        return workshop;
    }
}