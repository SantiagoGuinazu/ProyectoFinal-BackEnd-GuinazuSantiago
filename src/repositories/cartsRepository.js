import {CartDao} from "../dao/index.js"

export const getCartById = async () => await CartDao.getCartById();
export const createCart = async () => await CartDao.createCart();
export const addProductCart = async () => await CartDao.addProductCart();
export const deleteProductsInCart = async () => await CartDao.deleteProductsInCart();
export const updateProductsInCart = async () => await CartDao.updateProductsInCart();
export const deleteCart = async () => await CartDao.deleteCart();