import { inject, injectable } from "tsyringe";
import { ICancelSlotUseCase } from "../../entities/useCaseInterfaces/bookings/cancel-slot.usecase.interface";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IBookingModel } from "../../frameworks/database/mongoDB/models/booking.model";
import { IWalletRepository } from "../../entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { ITransactionRepository } from "../../entities/repositoryInterfaces/wallet/transaction.repository.interface";
import { generateUniqueId } from "../../frameworks/security/uniqueuid.bcrypt";

@injectable()
export class CancelSlotUseCase implements ICancelSlotUseCase {
    constructor(
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository,
        @inject("IWalletRepository") private _walletRepo: IWalletRepository,
        @inject("ITransactionRepository") private _transactionRepo: ITransactionRepository
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

        const customerId = booking.customerId.toString();

        const wallet = await this._walletRepo.refundUpdate(customerId, booking.amount);
        await this._transactionRepo.save({
            amount: booking.amount,
            description: "Refund",
            transactionId: generateUniqueId("txn"),
            wallet: wallet?._id.toString(),
            type: "credit"
        })

        return booking
    }
}