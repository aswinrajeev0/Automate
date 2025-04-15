import { injectable } from "tsyringe";
import { IChatRepository } from "../../../entities/repositoryInterfaces/chat/chat-repository.interface";
import { ConversationModel, IConversationModel } from "../../../frameworks/database/mongoDB/models/conversation.model";
import { IConversationEntity } from "../../../entities/models/conversation.entity";

@injectable()
export class ChatRepository implements IChatRepository {
    async find(filter: any): Promise<IConversationModel[]> {
        const conversations = await ConversationModel.find(filter).sort({ createdAt: -1 });
        return conversations
    }

    async findByUser(userId: string, userType: "customer" | "workshop"): Promise<IConversationModel[]> {
        const query = userType === "customer" ? { customerId: userId } : { workshopId: userId };
        return await ConversationModel.find(query);
    }

    async findOne(filter: any): Promise<IConversationModel | null> {
        const chat = await ConversationModel.findOne(filter);
        return chat;
    }

    async createChat(data: Partial<IConversationEntity>): Promise<IConversationModel> {
        const chat = await ConversationModel.create(data);
        return chat;
    }
}