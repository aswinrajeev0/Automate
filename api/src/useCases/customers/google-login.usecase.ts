import { OAuth2Client } from "google-auth-library";
import { IUserEntity } from "../../entities/models/user.entity";
import { ICustomerRepository } from "../../entities/repositoryInterfaces/customer/customer-repository.interface";
import { IGoogleUseCase } from "../../entities/useCaseInterfaces/customer/googlelogin.usecase.interface";
import { injectable, inject } from "tsyringe";
import { CustomError } from "../../entities/utils/custom.error";
import { HTTP_STATUS } from "../../shared/constants";
import { generateUniqueId } from "../../frameworks/security/uniqueuid.bcrypt";

@injectable()
export class GoogleUseCase implements IGoogleUseCase {
    private oAuthClient: OAuth2Client;
    constructor(
        @inject("ICustomerRepository")
        private customerRepo: ICustomerRepository,
    ) {
        this.oAuthClient = new OAuth2Client();
    }

    async execute(credential: string, client_id: string): Promise<Partial<IUserEntity>> {
        const ticket = await this.oAuthClient.verifyIdToken({
            idToken: credential,
            audience: client_id,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            throw new CustomError(
                "Invalid or empty token payload",
                HTTP_STATUS.UNAUTHORIZED
            );
        }

        const googleId = payload.sub;
		const email = payload.email;
        const name = payload.given_name;
        const profileImage = payload.picture || "";

        if (!email) {
			throw new CustomError("Email is required", HTTP_STATUS.BAD_REQUEST);
		}

        const existingUser = await this.customerRepo.findByEmail(email);
        if(!existingUser) {
            const customerId = generateUniqueId();
            const newUser = await this.customerRepo.save({
                password: " ",
                customerId,
                googleId,
                email,
                name,
                profileImage
            })

            if(!newUser) {
                throw new CustomError("", 0);
            }
            return newUser;
        }

        return existingUser;    
    }
}