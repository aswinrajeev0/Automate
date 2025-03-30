import { injectable } from "tsyringe";
import { IRequestRepository } from "../../../entities/repositoryInterfaces/requests/request-repository.interface";
import { IRequestEntity } from "../../../entities/models/request.entity";
import { IRequestModel, RequestModel } from "../../../frameworks/database/mongoDB/models/request.model";

@injectable()
export class RequestRepository implements IRequestRepository {
    async save(data: Partial<IRequestEntity>): Promise<IRequestModel> {
        const request = RequestModel.create(data);
        return request
    }
}