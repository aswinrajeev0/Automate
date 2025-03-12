import { Schema } from "mongoose";
import { ICustomerModel } from "../models/customer.model";

export const customerSchema = new Schema<ICustomerModel>({
    customerId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    profileImage: { type: String },
    isBlocked: { type: Boolean, default: false }
}, {
    timestamps: true
})