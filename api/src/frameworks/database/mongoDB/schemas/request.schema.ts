import { Schema, Types } from "mongoose";
import { IRequestModel } from "../models/request.model";

export const requestSchema = new Schema<IRequestModel>({
    requestId: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    vehicleNo: { type: String, required: true },
    carType: { type: String, required: true },
    carBrand: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String },
    workshopId: { type: Types.ObjectId, required: true },
    customerId: { type: Types.ObjectId, required: true },
    type: {type: String, enum: ["car-lift", "mobile-workshop"]},
    description: {type: String},
    notes: {type: String}
});
