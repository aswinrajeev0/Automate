import { IWorkshopRepository } from "../../../entities/repositoryInterfaces/workshop/workshop-repository.interface";
import { WorkshopModel } from "../../../frameworks/database/mongoDB/models/workshop.model";
import { IWorkshopEntity } from "../../../entities/models/workshop.entity";
import { injectable } from "tsyringe";
import { CustomError } from "../../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";

@injectable()
export class WorkshopRepository implements IWorkshopRepository {
    async save(data: Partial<IWorkshopEntity>): Promise<IWorkshopEntity> {
        const workshop = await WorkshopModel.create(data)
        return workshop;
    }

    async findById(id: string): Promise<IWorkshopEntity | null> {
        const workshop = await WorkshopModel.findById(id);
        return workshop;
    }

    async findByEmail(email: string): Promise<IWorkshopEntity | null> {
        const workshop = await WorkshopModel.findOne({ email });
        return workshop;
    }

    async updateByEmail(email: string, updates: Partial<IWorkshopEntity>): Promise<IWorkshopEntity | null> {
        const workshop = await WorkshopModel.findOneAndUpdate(
            { email },
            { $set: updates },
            { new: true }
        );
        if (!workshop) {
            return null
        }
        return workshop;
    }

    async findByIdAndUpdate(id: string, updates: Partial<IWorkshopEntity>): Promise<IWorkshopEntity | null> {
        const workshop = await WorkshopModel.findByIdAndUpdate(id, { $set: updates }, { new: true }).lean()
        return { ...workshop, id: workshop?._id.toString() } as IWorkshopEntity;
    }

    async find(filter: any, skip: number, limit: number): Promise<{ workshops: IWorkshopEntity[] | []; total: number; }> {
        const workshops = await WorkshopModel.find(filter).skip(skip).limit(limit);
        return { workshops, total: workshops.length }
    }

    async updateBlockStatus(id: string): Promise<IWorkshopEntity> {
        const workshop = await WorkshopModel.findById(id);

        if (!workshop) {
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            );
        }

        workshop.isBlocked = !workshop.isBlocked;

        await workshop.save();

        return workshop;
    }

}