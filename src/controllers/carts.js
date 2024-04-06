import { request, response } from "express";
import { CartsRepository, ProductsRepository, TicketsRepository, UsersRepository } from "../repositories/index.js";
import { v4 as uuidv4 } from "uuid";
import {logger} from "../utils/logger.js"
import { sendEmailTicket } from "../helpers/sendEmail.js";
import { Preference } from "mercadopago";
import { MercadoPagoConfig } from "mercadopago"; 


export const getCartById = async (req= request, res= response) => {
    try {
        const {_id} = req;
        const {cid} = req.params;

        const usuario = await UsersRepository.getUserById(_id);
        if(!usuario) return res.status(400).json({ok: false, msg:"Usuario no existe"});
        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: "Carrito no valido"});

        const carrito = await CartsRepository.getCartById(cid);
        
        return res.json({carrito});
        
    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"});
    }
};

export const addProductCart = async (req= request, res= response) => {
    try {
        const {_id} = req;
        const { cid, pid } = req.params;

        const usuario = await UsersRepository.getUserById(_id);
        if(!usuario) return res.status(400).json({ok: false, msg:"Usuario no existe"});
        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: "Carrito no valido"});
        
        const existeProducto = await ProductsRepository.getProductById(pid);
        if(!existeProducto) return res.status(400).json({ok:false, msg: "Producto no existe"});

        const carrito = await CartsRepository.addProductCart(cid, pid);

        if(!carrito)
            return res.status(404).json({msg:`el carrito con id ${cid} no existe`});

        return res.json({msg: "carrito actualizado", carrito});
    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"});
    }
};

export const deleteProductsInCart = async (req= request, res= response) => {
    try {
        const {_id} = req;
        const {cid,pid} = req.params;

        const usuario = await UsersRepository.getUserById(_id);
        if(!usuario) return res.status(400).json({ok: false, msg:"Usuario no existe"});

        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: "Carrito no valido"});
        
        const existeProducto = await ProductsRepository.getProductById(pid);
        if(!existeProducto) return res.status(400).json({ok:false, msg: "Producto no existe"});

        const carrito = await CartsRepository.deleteProductsInCart(cid,pid);

        return res.json({msg: " Producto eliminado del carrito", carrito});
    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"});
    }
};

export const updateProductsInCart = async (req= request, res= response) => {
    try {
        const {_id} = req;
        const {cid,pid} = req.params;
        const {quantity} = req.body;

        const usuario = await UsersRepository.getUserById(_id);
        if(!usuario) return res.status(400).json({ok: false, msg:"Usuario no existe"});

        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: "Carrito no valido"});
        
        const existeProducto = await ProductsRepository.getProductById(pid);
        if(!existeProducto) return res.status(400).json({ok:false, msg: "Producto no existe"});

        if(!quantity || !Number.isInteger(quantity))
            return res.status(404).json({msg:"La propuedad quantity es obligatoria y debe ser un numero entero"});

        const carrito = await CartsRepository.updateProductsInCart(cid, pid, quantity);
        if(!carrito)
            return res.status(404).json({msg: "No se pudo realizar esa operacion"});
        
        return res.json({msg: " Producto actualizado en el carrito", carrito});
    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"});
    }
};

export const finalizarCompra = async (req= request, res= response) => {
    try {
        
        const {_id} = req;
        const {cid} = req.params;

        const usuario = await UsersRepository.getUserById(_id);
        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: "Carrito no es valido"});

        const carrito = await CartsRepository.getCartById(cid);
        if(!(carrito.products.length > 0)) return res.status(400).json({ok:false, msg: "No se puede finalizar la compra, carrito vacio", carrito});

        const productosStockValid = carrito.products.filter(p=>p.id.stock >= p.quantity);

        const actualizacionesQuantity = productosStockValid.map(p=> 
            ProductsRepository.updateProduct(p.id._id,{stock: p.id.stock-p.quantity}));
        await Promise.all(actualizacionesQuantity);

        const items = productosStockValid.map(i=>({
            title:i.id.title, 
            price:i.id.price, 
            quantity:i.quantity,
            total:i.id.price*i.quantity
        }));

        let amount = 0;
        items.forEach(element => { amount = amount + element.total });
        const purchase = usuario.email;
        const code = uuidv4();
        const ticketCompra = await TicketsRepository.createTicket({ items, amount, purchase, code });

        sendEmailTicket(usuario.email,code,usuario.name,items,amount);

        await CartsRepository.deleteAllProductsInCart(usuario.cart_id);

        return res.json({ok:true, msg: "Compra generada", ticket: {code, cliente:purchase, items, amount}});
    } catch (error) {
        logger.error(error);
        return res.status(500).json({msg:"Hablar con admin"});
    }
};

export const createIdPreference = async (req = request, res = response) => {
    try {
        const { _id } = req;
        const { cid } = req.params;
        const client = new MercadoPagoConfig({ accessToken: process.env.YOUR_ACCESS_TOKEN_MP });

        const carrito = await CartsRepository.getCartById(cid);

        const items = carrito.products.map(item => {
            return {
                title: item.id.title,
                unit_price: Number(item.id.price),
                quantity: Number(item.quantity),
                currency_id: "ARS"
            }
        });

        const back_urls = {
            //success: "https://guinazusantiago-ecommerce-front.netlify.app/mi-carrito",
            //failure: "https://guinazusantiago-ecommerce-front.netlify.app/mi-carrito",
            //pending: "https://guinazusantiago-ecommerce-front.netlify.app/mi-carrito"
            success: "http://localhost:5173/mi-carrito",
            failure: "http://localhost:5173/mi-carrito",
            pending: "http://localhost:5173/mi-carrito"
        };

        const body = {
            items:items,
            back_urls:back_urls,
            auto_return: "approved"
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        return res.json({ ok: true, idPreference: result.id });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ msg: "Hablar con un administrador" });
    }
};