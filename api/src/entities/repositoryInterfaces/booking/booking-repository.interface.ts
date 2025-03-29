import { IBookingModel } from "../../../frameworks/database/mongoDB/models/booking.model";
import { IBookingEntity } from "../../models/booking.entity";

export interface IBookingRepository {
    find(condition: Partial<IBookingEntity>): Promise<IBookingModel[]>;
    save(data: Partial<IBookingEntity>): Promise<IBookingModel>
}