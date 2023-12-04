import { request, response } from "express";
import { getProductsService } from "../services/products.js";
import { getCartByIdService } from "../services/carts.js";

export const realTimeProductsView = async (req = request, res = response) => {
    return res.render('productos-real-time')
}

export const chatView = async (req = request, res = response) => {
    return res.render('chat', {styles: 'chat.css'})
}

export const productsView = async (req = request, res = response) => {
    const result = await getProductsService({...req.query});
    return res.render('productos', {result})
}

export const cartIdView = async (req = request, res = response) => {
    const {cid} = req.params;
    const carrito = await getCartByIdService(cid);
    return res.render('cart', {carrito});
}

export const loginGet = async (req = request, res = response) => {
    return res.render('login', {styles:'login.css'})
}

export const registerGet = async (req = request, res = response) => {
    return res.render('register', {styles:'login.css'})
}