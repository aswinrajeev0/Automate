import { IMessageEntity } from "./message.entity";

export interface IConversationEntity {
    id: string;
    customerId: string;
    customerName: string;
    workshopId: string;
    workshopName: string;
    messages: IMessageEntity[];
    createdAt: Date;
    updatedAt: Date;
}