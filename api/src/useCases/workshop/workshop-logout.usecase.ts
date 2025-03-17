import { inject, injectable } from "tsyringe";
import { IWorkshopLogoutUseCase } from "../../entities/useCaseInterfaces/workshop/workshoplogout.usecase.interface";
import { UserRequest } from "../../interface-adapters/middlewares/auth.midleware";
import { IBlackListTokenUseCase } from "../../entities/useCaseInterfaces/blacklisttoken.usecase.interface";
import { IRevokeRefreshTokenUseCase } from "../../entities/useCaseInterfaces/revoke-refreshtoken.usecase.interface";

@injectable()
export class WorkshopLogoutUseCase implements IWorkshopLogoutUseCase {
    constructor(
        @inject("IBlackListTokenUseCase") private blackListTokenUseCase: IBlackListTokenUseCase,
        @inject("IRevokeRefreshTokenUseCase") private revokeRefreshToken: IRevokeRefreshTokenUseCase
    ) { }

    async execute(user: UserRequest): Promise<void> {
        await this.blackListTokenUseCase.execute(user.access_token);
        await this.revokeRefreshToken.execute(user.refresh_token);
    }
}