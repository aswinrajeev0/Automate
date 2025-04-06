import { injectable } from "tsyringe";
import { ITransactionRepository } from "../../../entities/repositoryInterfaces/wallet/transaction.repository.interface";
import { ITransactionEntity } from "../../../entities/models/transaction.entity";
import { ITransactionModel, TransactionModel } from "../../../frameworks/database/mongoDB/models/transaction.model";

@injectable()
export class TransactionRepository implements ITransactionRepository {
    async save(data: Partial<ITransactionEntity>): Promise<ITransactionModel> {
        const transaction = await TransactionModel.create(data);
        return transaction
    }

    async find(filter: Partial<ITransactionEntity>): Promise<ITransactionModel[]> {
        const transactions = await TransactionModel.find(filter)
        return transactions
    }
}