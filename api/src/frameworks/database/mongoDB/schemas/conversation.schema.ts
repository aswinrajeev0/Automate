import { Schema } from "mongoose";
import { IConversationModel, IMessageModel } from "../models/conversation.model";

export const messageSchema = new Schema<IMessageModel>({
    content: { type: String, required: true },
    sender: { type: String, enum: ["customer", "workshop"], required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
});

export const conversationSchema = new Schema<IConversationModel>({
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    customerName: { type: String, required: true },
    workshopId: { type: Schema.Types.ObjectId, ref: "Workshop" },
    workshopName: { type: String, required: true },
    messages: { type: [messageSchema], default: [] }
}, {timestamps: true})