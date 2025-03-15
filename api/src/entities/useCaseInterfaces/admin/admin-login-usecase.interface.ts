import { AdminLoginDTO } from "../../../shared/dtos/customer.dto";
import { IUserEntity } from "../../models/user.entity";

export interface IAdminLoginUseCase {
    execute(user: AdminLoginDTO): Promise<Partial<IUserEntity>>
}