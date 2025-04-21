import { IMessageEntity } from "./message.entity";

export interface IConversationEntity {
    id: string;
    customerId: string;
    customerName: string;
    workshopId: string;
    workshopName: string;
    latestMessage: {
        content: string,
        timestamp: Date,
        sender: string,
        status: string,
    };
    createdAt: Date;
    updatedAt: Date;
}