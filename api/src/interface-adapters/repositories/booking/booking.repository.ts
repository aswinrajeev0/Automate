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

    async findUpcomingBookings(filter: any): Promise<IBookingModel[]> {
        const bookings = await BookingModel.find(filter);
        return bookings
    }

    async findAllWorkshopBookings(filter: Partial<IBookingEntity>, skip: number, limit: number): Promise<{bookings: IBookingModel[]; total: number}> {
        const bookings = await BookingModel.find(filter)
            .populate("workshopId", "name")
            .populate("customerId", "name phone")
            .skip(skip)
            .limit(limit)
        const total = await BookingModel.countDocuments(filter)
        return {bookings, total};
    }

    async findOneAndUpdate(filter: Partial<IBookingEntity>, update: Partial<IBookingEntity>): Promise<IBookingModel | null> {
        const booking = await BookingModel.findOneAndUpdate(filter, update).populate("customerId", "name, phone").populate("workshopId", "name");
        return booking
    }
}