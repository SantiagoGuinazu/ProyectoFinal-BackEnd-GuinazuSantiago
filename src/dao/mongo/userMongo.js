import { userModel } from "./models/userModels.js";

export const getUserById = async (id) => await userModel.findById(id).populate('cart_id');

export const getUserByEmail = async (email) => await userModel.findOne({ email }).populate('cart_id');

export const registerUser = async (user) => await userModel.create({ ...user });
