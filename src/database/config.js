import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.URI_Mongo_DB,{dbName:process.env.NAME_DB});
        logger.info('Base de datos online');
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
};



/*
mongoose.connect(URI_Mongo_DB, { dbName: NAME_DB })
    .then(() => {
        const httpServer = app.listen(PORT, () => logger.info(`Listening on port: ${PORT}`))
        const socketServer = new Server(httpServer)
        socketServer.on("connection", async socket => {
        socket.emit("messages", await messagesService.getMessages())
        socket.on("new-message", async ({ message, user }) => {
            await messagesService.createMessage(user, message)
            socketServer.emit("messages", await messagesService.getMessages())
        })
        })
    })
    .catch(e => {
        logger.fatal("Fatal: ERROR TRYING TO CONNECT MONGO DB")
    })
*/