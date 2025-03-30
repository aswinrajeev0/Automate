import { IRequestModel } from "../../../frameworks/database/mongoDB/models/request.model";
import { IRequestEntity } from "../../models/request.entity";

export interface IRequestRepository {
    save(data: Partial<IRequestEntity>):Promise<IRequestModel>
}