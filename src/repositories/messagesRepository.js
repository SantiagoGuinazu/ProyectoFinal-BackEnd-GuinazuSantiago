import {MessageDao} from "../dao/index.js";

export const getMessages = async (user) => await MessageDao.getMessa(user);