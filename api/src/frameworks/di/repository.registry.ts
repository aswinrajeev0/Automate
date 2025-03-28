import { container } from "tsyringe";

import { ICustomerRepository } from "../../entities/repositoryInterfaces/customer/customer-repository.interface";
import { CustomerRepository } from "../../interface-adapters/repositories/customers/customer.repository";
import { IOtpRepository } from "../../entities/repositoryInterfaces/otp-repository.interface";
import { OtpRepository } from "../../interface-adapters/repositories/send-otp.repository";
import { IRefreshTokenRepository } from "../../entities/repositoryInterfaces/refresh-token-repository.interface";
import { RefreshTokenRepository } from "../../interface-adapters/repositories/refresh-token.repository";
import { IWorkshopRepository } from "../../entities/repositoryInterfaces/workshop/workshop-repository.interface";
import { WorkshopRepository } from "../../interface-adapters/repositories/workshop/workshop.repository";
import { IReviewRepository } from "../../entities/repositoryInterfaces/review/review-repository.interface";
import { ReviewRepository } from "../../interface-adapters/repositories/workshop/review-repository";

export class RepositoryRegistry {
    static registerRepositories(): void {
        container.register<ICustomerRepository>("ICustomerRepository", {
            useClass: CustomerRepository
        })

        container.register<IOtpRepository>("IOtpRepository", {
            useClass: OtpRepository
        })

        container.register<IRefreshTokenRepository>("IRefreshTokenRepository", {
            useClass: RefreshTokenRepository
        })

        container.register<IWorkshopRepository>("IWorkshopRepository", {
            useClass: WorkshopRepository
        })

        container.register<IReviewRepository>("IReviewRepository", {
            useClass: ReviewRepository
        })
    }
}