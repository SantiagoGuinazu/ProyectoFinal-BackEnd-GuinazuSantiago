import { cartModel } from "./models/cartsModels.js";

export const getCartById = async (cid) => await cartModel.findById(cid).populate("products.id",["title","price","stock","thumbnails"]);

export const createCart = async () => await cartModel.create({});

export const addProductCart = async (cid, pid) => {
    const carrito = await cartModel.findById(cid);

    if (!carrito)
        return null;

    const productoInCart = carrito.products.find(p => p.id.toString() === pid);

    if (productoInCart)
        productoInCart.quantity++;
    else
        carrito.products.push({ id: pid, quantity: 1 });

    await carrito.save();

    return await getCartById(cid);
};

export const deleteProductsInCart = async (cid, pid) => 
    await cartModel.findByIdAndUpdate(cid, { $pull: { "products": { id: pid } } }, { new: true }).populate("products.id", ["title", "price", "stock","thumbnails"]);

export const updateProductsInCart = async (cid, pid, quantity) => 
    await cartModel.findOneAndUpdate(
        { _id: cid, "products.id": pid },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
    ).populate("products.id", ["title", "price", "stock","thumbnails"]);
    
export const deleteCart = async (cid) => await cartModel.findByIdAndDelete(cid);

export const deleteAllProductsInCart = async (cid) => await cartModel.findByIdAndUpdate(cid,{$set:{"products":[]}},{new:true});