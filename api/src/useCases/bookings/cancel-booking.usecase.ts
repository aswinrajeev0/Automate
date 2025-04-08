import { inject, injectable } from "tsyringe";
import { ICancelBookingUseCase } from "../../entities/useCaseInterfaces/bookings/cancel-booking.usecase.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { BookingDto } from "../../shared/dtos/booking.dto";
import { IPopulatedId } from "../../frameworks/database/mongoDB/models/booking.model";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class CancelBookingUseCase implements ICancelBookingUseCase {
    constructor(
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
    ){}

    async execute(bookingId: string): Promise<BookingDto> {
        const booking = await this._bookingRepo.findOneAndUpdate({bookingId},{status: "cancelled"})
        if(!booking) {
            throw new CustomError(
                ERROR_MESSAGES.NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }
        return {
            customer: (booking.customerId as IPopulatedId).name,
            customerId: (booking.customerId as IPopulatedId)._id.toString(),
            customerPhone: (booking.customerId as IPopulatedId).phone,
            amount: booking.amount,
            bookingId: booking.bookingId,
            date: booking.date,
            endTime: booking.endTime,
            gst: booking.gst || 0,
            price: booking.price,
            status: booking.status,
            time: booking.time,
            type: booking.type
        }
    }

}