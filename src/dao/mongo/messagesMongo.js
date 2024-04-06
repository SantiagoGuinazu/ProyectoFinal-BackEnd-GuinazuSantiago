import { messageModel } from './models/messagesModel.js';

export const getMessa = async (user, message) => await messageModel.find(user,message);