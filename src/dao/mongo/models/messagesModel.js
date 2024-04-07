import { Schema, model } from "mongoose";

const nameCollection = "messages";

const MessageSchema = new Schema({
    user: {type: String},
    message: {type: String},
});

export const messageModel = model(nameCollection, MessageSchema);