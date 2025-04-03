import { Schema, Types } from "mongoose";
import { IBookingModel } from "../models/booking.model";

export const bookingSchema = new Schema<IBookingModel>({
    bookingId: {type: String, required: true},
    customerId: {type: Types.ObjectId, required: true},
    workshopId: {type: Types.ObjectId, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    type: {type: String, required: true},
    endTime: {type: String, required: true },
    duration: {type: Number, required: true}
})