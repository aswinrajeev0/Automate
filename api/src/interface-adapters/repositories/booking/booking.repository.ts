import { injectable } from "tsyringe";
import { IBookingRepository } from "../../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IBookingEntity } from "../../../entities/models/booking.entity";
import { BookingModel, IBookingModel } from "../../../frameworks/database/mongoDB/models/booking.model";

@injectable()
export class BookingRepository implements IBookingRepository {
    async find(condition: Partial<IBookingEntity>): Promise<IBookingModel[]> {
        const bookings = BookingModel.find(condition);
        return bookings
    }

    async save(data: Partial<IBookingEntity>): Promise<IBookingModel> {
        const booking = await BookingModel.create(data);
        return booking;
    }

    async findOneAndDelete(filter: Partial<IBookingEntity>): Promise<IBookingModel | null> {
        const booking = await BookingModel.findOneAndDelete(filter);
        return booking ? booking : null
    }
}