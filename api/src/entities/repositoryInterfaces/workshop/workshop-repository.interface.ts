import { IWorkshopWithRatings } from "../../models/workshop-with-rating.entity";
import { IWorkshopEntity } from "../../models/workshop.entity"

export interface IWorkshopRepository {
    save(data: Partial<IWorkshopEntity>): Promise<IWorkshopEntity>
    findById(id: string): Promise<IWorkshopEntity | null>;
    findByEmail(email: string): Promise<IWorkshopEntity | null>;
    updateByEmail(email: string, updates: Partial<IWorkshopEntity>): Promise<IWorkshopEntity | null>
    findByIdAndUpdate(id: string, updates: Partial<IWorkshopEntity>): Promise<IWorkshopEntity | null>
    find(
        filter: any,
        skip: number,
        limit: number,
    ): Promise<{ workshops: IWorkshopEntity[] | []; total: number }>
    updateBlockStatus(id: string): Promise<IWorkshopEntity>;
    getWorkshopsWithRatings(skip: number, limit: number, searchTerm?: string): Promise<Partial<IWorkshopWithRatings[]>>
}