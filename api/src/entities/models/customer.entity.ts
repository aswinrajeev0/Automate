import { IUserEntity } from "./user.entity";

export interface ICustomerEntity extends IUserEntity {
    customerId: string;
    googleId: string
}