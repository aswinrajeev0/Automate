import { inject, injectable } from "tsyringe";
import { IChatController } from "../../entities/controllerInterfaces/chat-controller.interface";
import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { IGetConversationsUseCase } from "../../entities/useCaseInterfaces/chat/get-coversations.usecase.interface";
import { IFallBackUsersUseCase } from "../../entities/useCaseInterfaces/chat/fallback-users.usecase.interface";
import { IStartConversationUseCase } from "../../entities/useCaseInterfaces/chat/start-chat.usecase.interface";

@injectable()
export class ChatController implements IChatController {
    constructor(
        @inject("IGetConversationsUseCase") private _getConversations: IGetConversationsUseCase,
        @inject("IFallBackUsersUseCase") private _fallbackUSers: IFallBackUsersUseCase,
        @inject("IStartConversationUseCase") private _startConversation: IStartConversationUseCase
    ){}

    async getConversations(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user;
            if(!user) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    success: false,
                    message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS
                })
                return;
            }

            const {id: userId, role: useType} = user;

            const conversations = await this._getConversations.execute(userId, useType)

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.DATA_RETRIEVED,
                conversations
            })

        } catch (error) {
            next(error)
        }
    }

    async fallBackUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id as string;
            const userType = req.user?.role as "customer" | "workshop";
            const users = await this._fallbackUSers.execute(userId, userType)

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.DATA_RETRIEVED,
                users
            })

        } catch (error) {
            next(error)
        }
    }

    async startChat(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {customerId, workshopId} = req.body;
            if(!customerId || !workshopId) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.DATA_MISSING
                })
                return
            }

            const chat = await this._startConversation.execute(customerId, workshopId);

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.CREATED,
                chat
            })

        } catch (error) {
            next(error)
        }
    }

}