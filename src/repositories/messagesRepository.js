import {MessageDao} from "../dao/index.js";

export const getMessages = async (user, message) => await MessageDao.getMessa(user, message);