import { TicketDao } from "../dao/index.js";

export const getUserById = async (id) => await TicketDao.getUserById(id);
export const getUserByEmail = async (email) => await TicketDao.getUserByEmail(email);
export const registerUser = async (user) => await TicketDao.registerUser(user);