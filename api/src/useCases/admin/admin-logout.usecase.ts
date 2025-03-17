import { IAdminLogoutUseCase } from "../../entities/useCaseInterfaces/admin/admin-logout.usecase.interface";
import { inject, injectable } from "tsyringe";
import { UserRequest } from "../../interface-adapters/middlewares/auth.midleware";
import { IRevokeRefreshTokenUseCase } from "../../entities/useCaseInterfaces/revoke-refreshtoken.usecase.interface";
import { IBlackListTokenUseCase } from "../../entities/useCaseInterfaces/blacklisttoken.usecase.interface";

@injectable()
export class AdminLogoutUseCase implements IAdminLogoutUseCase {
    constructor(
        @inject("IBlackListTokenUseCase") private blackListTokenUseCase: IBlackListTokenUseCase,
        @inject("IRevokeRefreshTokenUseCase") private revokeRefreshToken: IRevokeRefreshTokenUseCase
    ) { }

    async execute(user: UserRequest): Promise<void> {
        await this.blackListTokenUseCase.execute(user.access_token);
        await this.revokeRefreshToken.execute(user.refresh_token);
    }
}