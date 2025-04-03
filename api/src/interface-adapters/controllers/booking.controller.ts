import { inject, injectable } from "tsyringe";
import { IBookingController } from "../../entities/controllerInterfaces/booking-controller.interface";
import { Request, Response, NextFunction } from "express";
import { IGetBookedSlotsUseCase } from "../../entities/useCaseInterfaces/bookings/get-booked-slots.usecase.interface";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { IBookSlotUseCase } from "../../entities/useCaseInterfaces/bookings/slot-book.usecase.interface";
import { ICancelSlotUseCase } from "../../entities/useCaseInterfaces/bookings/cancel-slot.usecase.interface";

@injectable()
export class BookingController implements IBookingController {
    constructor(
        @inject("IGetBookedSlotsUseCase") private _getBookedSlots: IGetBookedSlotsUseCase,
        @inject("IBookSlotUseCase") private _bookSlot: IBookSlotUseCase,
        @inject("ICancelSlotUseCase") private _cancelSlot: ICancelSlotUseCase
    ) { }

    async getBookedSlots(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const workshopId = req.params.workshopId;
            const type = req.query.type as string
            const bookings = await this._getBookedSlots.execute(workshopId, type)
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.DATA_RETRIEVED,
                bookings
            })
        } catch (error) {
            next(error)
        }
    }

    async bookSlot(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const booking = await this._bookSlot.execute(data)
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: SUCCESS_MESSAGES.BOOKING_SUCCESS,
                booking
            })
        } catch (error) {
            next(error)
        }
    }

    async cancelslot(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const {bookingId} = req.params;

            if(!bookingId) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.ID_NOT_FOUND
                })
                return;
            }

            const bookindDoc = await this._cancelSlot.execute(bookingId)

            const booking = {
                bookingId: bookindDoc.bookingId,
                customerId: bookindDoc.customerId,
                workshopId: bookindDoc.workshopId,
                date: bookindDoc.date,
                time: bookindDoc.time,
                type: bookindDoc.type,
                endTime: bookindDoc.endTime,
                duration: bookindDoc.duration
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.BOOKING_CANCELED,
                booking
            })

        } catch (error) {
            next(error)
        }
    }
}