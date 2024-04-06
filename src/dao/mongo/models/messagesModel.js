import { Schema, model } from "mongoose";

const nameCollection = "messages";

const messageSchema = new Schema({
    user: String,
    message: String
});

export const messageModel = model(nameCollection, messageSchema);