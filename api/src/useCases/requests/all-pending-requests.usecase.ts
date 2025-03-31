import { inject, injectable } from "tsyringe";
import { IAllPendingRequestsUseCAse } from "../../entities/useCaseInterfaces/requests/all-pending-request.usecase.interface"
import { IRequestRepository } from "../../entities/repositoryInterfaces/requests/request-repository.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IRequestModel } from "../../frameworks/database/mongoDB/models/request.model";

@injectable()
export class AllPendingRequestsUseCAse implements IAllPendingRequestsUseCAse {
    constructor(
        @inject("IRequestRepository") private _requestRepo: IRequestRepository
    ) { }

    async execute(workshopId: string, pageNumber: number, pageSize: number, searchTerm: string): Promise<{requests: IRequestModel[]; total: number}> {
        let filter: any = {};
        if (searchTerm) {
            filter.$or = [
                { name: { $regex: searchTerm, $options: "i" } },
                { requestId: { $regex: searchTerm, $options: "i" } },
                { vehicleNo: { $regex: searchTerm, $options: "i" } }
            ]
        }

        filter.workshopId = workshopId;
        filter.status = "submitted"

        const validPageNumber = Math.max(1, pageNumber || 1);
        const validPageSize = Math.max(1, pageSize || 10);
        const skip = (validPageNumber - 1) * validPageSize;
        const limit = validPageSize;

        const {requests, total} = await this._requestRepo.find(filter, skip, limit);
        if (!requests) {
            throw new CustomError(
                ERROR_MESSAGES.NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        return {requests, total};
    }
}