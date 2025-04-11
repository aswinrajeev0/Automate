import 'reflect-metadata'
import { Server } from "./frameworks/http/server";
import { MongoConnect } from "./frameworks/database/mongoDB/mongoConnect";
import { config } from "./shared/config";
import { startExpiredSlotCleaner } from './frameworks/schedulers/clearExpiredSlots';

const server = new Server();
const mongoConnect = new MongoConnect();

mongoConnect.connectDb()

startExpiredSlotCleaner();

server.getApp().listen(config.server.PORT, () => {
    console.log(`Server is running on port ${config.server.PORT}`)
});