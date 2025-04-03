import { inject, injectable } from "tsyringe";
import { ICancelSlotUseCase } from "../../entities/useCaseInterfaces/bookings/cancel-slot.usecase.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IBookingModel } from "../../frameworks/database/mongoDB/models/booking.model";

@injectable()
export class CancelSlotUseCase implements ICancelSlotUseCase {
    constructor(
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository
    ) { }

    async execute(bookingId: string): Promise<IBookingModel> {
        const filter = {
            bookingId
        }
        const booking = await this._bookingRepo.findOneAndDelete(filter);
        if (!booking) {
            throw new CustomError(
                ERROR_MESSAGES.REQUEST_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        return booking
    }
}