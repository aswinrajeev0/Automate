import { IUserEntity } from "../../../entities/models/user.entity"
import { CustomerLoginDTO } from "../../../shared/dtos/customer.dto"

export interface ILoginCustomerUseCase {
    execute(user: CustomerLoginDTO): Promise<Partial<IUserEntity>>
}