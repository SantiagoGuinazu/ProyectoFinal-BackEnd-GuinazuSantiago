import { ProductDao } from "../dao/index.js"

export const getProducts = async () => await ProductDao.getProducts();
export const getProductById = async () => await ProductDao.getProductById();
export const getProductByCode = async () => await ProductDao.getProductByCode();
export const addProduct = async () => await ProductDao.addProduct();
export const updateProduct = async () => await ProductDao.updateProduct();
export const deleteProduct = async () => await ProductDao.deleteProduct();