import mongoose from 'mongoose'

const chatCollection = 'Messages'

const chatSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true
    },
    message: String, 
});

const MessageModel = mongoose.model(chatCollection, chatSchema)

export default MessageModel