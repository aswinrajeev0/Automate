import { IWorkshopRepository } from "../../entities/repositoryInterfaces/workshop/workshop-repository.interface";
import { IUpdateWorkshopStatusUseCase } from "../../entities/useCaseInterfaces/workshop/update-worksho-status-usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateWorkshopStatusUseCase implements IUpdateWorkshopStatusUseCase {
    constructor(
        @inject("IWorkshopRepository")
        private workshopRepo: IWorkshopRepository
    ){}

    async execute(workshopId: string): Promise<void> {
        await this.workshopRepo.updateBlockStatus(workshopId)
    }
}