import { inject, injectable } from "tsyringe";
import { IRejectRequestUSeCase } from "../../entities/useCaseInterfaces/requests/reject-request.usecase.interface";
import { IRequestModel } from "../../frameworks/database/mongoDB/models/request.model";
import { IRequestRepository } from "../../entities/repositoryInterfaces/requests/request-repository.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class RejectRequestUSeCase implements IRejectRequestUSeCase {
    constructor(
        @inject("IRequestRepository") private _requestRepo: IRequestRepository
    ){}

    async execute(requestId: string): Promise<IRequestModel> {
        const request = await this._requestRepo.findOneAndUpdate({requestId},{status: "rejected"})
        if(!request) {
            throw new CustomError(
                ERROR_MESSAGES.REQUEST_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }
        return request;
    }
}