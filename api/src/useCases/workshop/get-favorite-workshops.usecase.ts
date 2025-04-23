import { inject, injectable } from "tsyringe";
import { IFavoriteWorkshopsUseCase } from "../../entities/useCaseInterfaces/workshop/get-favorite-workshops.usecase.interface";
import { IFavoriteWorkshops } from "../../shared/dtos/workshop.dto";
import { IFavoritesRepository } from "../../entities/repositoryInterfaces/favorites/favorites.repository.interface";

@injectable()
export class FavoriteWorkshopsUseCase implements IFavoriteWorkshopsUseCase {
    constructor(
        @inject("IFavoritesRepository") private _favoriteRepo: IFavoritesRepository
    ){}

    async execute(customerId: string, page: number, limit: number): Promise<IFavoriteWorkshops[]> {
        const skip = (page-1) * limit;
        const workshops = await this._favoriteRepo.wokrkshops(customerId, skip, limit);
        return workshops
    }
}