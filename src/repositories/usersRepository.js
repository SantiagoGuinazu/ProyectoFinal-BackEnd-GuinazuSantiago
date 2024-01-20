import { UserDao } from "../dao/index.js";

export const getUserById = async (id) => await UserDao.getUserById();
export const getUserByEmail = async (email) => await UserDao.getUserByEmail();
export const registerUser = async (user) => await UserDao.registerUser();