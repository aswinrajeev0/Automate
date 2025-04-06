import { ITransactionModel } from "../../../frameworks/database/mongoDB/models/transaction.model";
import { IWalletModel } from "../../../frameworks/database/mongoDB/models/wallet.model";

export interface IWalletUseCase {
    getWallet(customerId: string): Promise<{wallet: IWalletModel, transactions: ITransactionModel[]}>;
    addMoney(customerId: string, amount: number): Promise<ITransactionModel>;
}