import { IConversationModel } from "../../../frameworks/database/mongoDB/models/conversation.model";

export interface IChatRepository {
    find(filter: any): Promise<IConversationModel[]>
}