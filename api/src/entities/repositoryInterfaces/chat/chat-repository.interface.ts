import { IConversationModel } from "../../../frameworks/database/mongoDB/models/conversation.model";
import { IConversationEntity } from "../../models/conversation.entity";

export interface IChatRepository {
    find(filter: any): Promise<IConversationModel[]>;
    findByUser(userId: string, userType: "customer" | "workshop"): Promise<IConversationModel[]>;
    findOne(filter: any): Promise<IConversationModel | null>;
    createChat(data: Partial<IConversationEntity>): Promise<IConversationModel>;
}