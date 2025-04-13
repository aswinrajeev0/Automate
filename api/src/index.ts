import 'reflect-metadata'
import { Server } from "./frameworks/http/server";
import { MongoConnect } from "./frameworks/database/mongoDB/mongoConnect";
import { config } from "./shared/config";
import { startExpiredSlotCleaner } from './frameworks/schedulers/clearExpiredSlots';
import { createServer } from 'http';
import { initializeSocket } from './frameworks/websocket/socketServer';

const server = new Server();
const mongoConnect = new MongoConnect();

mongoConnect.connectDb()

startExpiredSlotCleaner();

const httpServer = createServer(server.getApp());

initializeSocket(httpServer);

httpServer.listen(config.server.PORT, () => {
    console.log(`Server is running on port ${config.server.PORT}`);
});