import { messageModel } from "./models/messagesModel.js";

export const getMessa = async (user) => await messageModel.create(user);