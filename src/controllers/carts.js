import { request, response } from 'express';
import { CartsRepository, ProductsRepository, UsersRepository } from "../repositories/index.js";
import { validarStockProducts } from '../helpers/db-validaciones.js';

export const getCartById = async (req= request, res= response) => {
    try {
        const {_id} = req;
        const {cid} = req.params;

        const usuario = await UsersRepository.getUserById(_id);
        if(!usuario) return res.status(400).json({ok: false, msg:'Usuario no existe'});
        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: 'Carrito no valido'});

        const carrito = await CartsRepository.getCartById(cid);
        if(carrito)
            return res.json({carrito})
        
    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

//export const createCart = async (req= request, res= response) => {
//    try {
//        const carrito = await CartsRepository.createCart();
//        return res.json({msg:'Carrito creado', carrito})
//    } catch (error) {
//        return res.status(500).json({msg:"Hablar con admin"})
//    }
//}

export const addProductCart = async (req= request, res= response) => {
    try {
        const {_id} = req;
        const { cid, pid } = req.params;

        const usuario = await UsersRepository.getUserById(_id);
        if(!usuario) return res.status(400).json({ok: false, msg:'Usuario no existe'});
        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: 'Carrito no valido'});
        
        const existeProducto = await ProductsRepository.getProductById(pid);
        if(!existeProducto) return res.status(400).json({ok:false, msg: 'Producto no existe'});

        const carrito = await CartsRepository.addProductCart(cid, pid);

        if(!carrito)
            return res.status(404).json({msg:`el carrito con id ${cid} no existe`})

        return res.json({msg: "carrito actualizado", carrito})
    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

export const deleteProductsInCart = async (req= request, res= response) => {
    try {
        const {_id} = req;
        const {cid,pid} = req.params;

        const usuario = await UsersRepository.getUserById(_id);
        if(!usuario) return res.status(400).json({ok: false, msg:'Usuario no existe'});

        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: 'Carrito no valido'});
        
        const existeProducto = await ProductsRepository.getProductById(pid);
        if(!existeProducto) return res.status(400).json({ok:false, msg: 'Producto no existe'});

        const carrito = await CartsRepository.deleteProductsInCart(cid,pid);

        return res.json({msg: ' Producto eliminado del carrito', carrito})
    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

export const updateProductsInCart = async (req= request, res= response) => {
    try {
        const {_id} = req;
        const {cid,pid} = req.params;
        const {quantity} = req.body;

        const usuario = await UsersRepository.getUserById(_id);
        if(!usuario) return res.status(400).json({ok: false, msg:'Usuario no existe'});

        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: 'Carrito no valido'});
        
        const existeProducto = await ProductsRepository.getProductById(pid);
        if(!existeProducto) return res.status(400).json({ok:false, msg: 'Producto no existe'});

        if(!quantity || !Number.isInteger(quantity))
            return res.status(404).json({msg:'La propuedad quantity es obligatoria y debe ser un numero entero'})

        const carrito = await CartsRepository.updateProductsInCart(cid, pid, quantity);

        if(!carrito)
            return res.status(404).json({msg: 'No se pudo realizar esa operacion'})
        
        return res.json({msg: ' Producto actualizado en el carrito', carrito})

    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

//export const deleteCart = async (req= request, res= response) => {
//    try {
//        const {cid} = req.params;
//
//        const carrito = await CartsRepository.deleteCart(cid);
//
//        if(!carrito)
//            return res.status(404).json({msg: 'No se pudo realizar esa operacion'})
//        return res.json({msg: ' Producto actualizado en el carrito', carrito})
//    } catch (error) {
//        return res.status(500).json({msg:"Hablar con admin"})
//    }
//}

export const finalizarCompra = async (req= request, res= response) => {
    try {
        
        const {_id} = req;
        const {cid} = req.params;

        const usuario = await UsersRepository.getUserById(_id);

        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: 'Carrito no es valido'});

        const carrito = await CartsRepository.getCartById(cid);

        validarStockProducts(carrito.products);

        return res.json({ok:true, carrito});
    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"})
    }
}