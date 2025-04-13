import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { config } from "../../shared/config";
import { ConversationModel } from "../database/mongoDB/models/conversation.model";

let io: SocketIOServer;

export const initializeSocket = (httpServer: HttpServer) => {
    io = new SocketIOServer(httpServer, {
        cors: {
            origin: config.cors.ALLOWED_ORIGIN,
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("joinRoom", (roomId: string) => {
            socket.join(roomId);
            console.log(`${socket.id} joined room ${roomId}`);
        });

        socket.on("sendMessage", async (data) => {
            const { roomId, content, sender } = data;
            io.to(data.roomId).emit("receiveMessage", {
                content,
                sender,
                timestamp: new Date(),
                status: "sent"
            });
            try {
                await ConversationModel.findByIdAndUpdate(
                    roomId,
                    {
                        $push: {
                            messages: {
                                content,
                                sender,
                                timestamp: new Date(),
                                status: "sent"
                            }
                        },
                        $set: { updatedAt: new Date() }
                    },
                    { new: true, useFindAndModify: false }
                );
            } catch (error) {
                console.error("Failed to save message:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};

export const getIO = (): SocketIOServer => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};
