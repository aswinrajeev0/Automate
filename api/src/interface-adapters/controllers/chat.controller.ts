import { inject, injectable } from "tsyringe";
import { IChatController } from "../../entities/controllerInterfaces/chat-controller.interface";
import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constants";
import { IGetConversationsUseCase } from "../../entities/useCaseInterfaces/chat/get-coversations.usecase.interface";

@injectable()
export class ChatController implements IChatController {
    constructor(
        @inject("IGetConversationsUseCase") private _getConversations: IGetConversationsUseCase
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
}