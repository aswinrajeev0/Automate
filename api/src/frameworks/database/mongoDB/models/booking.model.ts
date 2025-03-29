import { Document, model, ObjectId } from "mongoose";
import { IBookingEntity } from "../../../../entities/models/booking.entity";
import { bookingSchema } from "../schemas/booking.schema";

export interface IBookingModel extends Omit<IBookingEntity, "id" |"customerId" | "workshopId">, Document {
    _id: ObjectId;
    customerId: ObjectId;
    workshopId: ObjectId;
}

export const BookingModel = model<IBookingModel>("Booking", bookingSchema)