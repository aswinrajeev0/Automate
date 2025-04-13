import { injectable } from "tsyringe";
import { IChatRepository } from "../../../entities/repositoryInterfaces/chat/chat-repository.interface";
import { ConversationModel, IConversationModel } from "../../../frameworks/database/mongoDB/models/conversation.model";

@injectable()
export class ChatRepository implements IChatRepository {
    async find(filter: any): Promise<IConversationModel[]> {
        const conversations = await ConversationModel.find(filter).sort({createdAt: -1});
        return conversations
    }
}