import { request, response } from 'express';
import { CartsRepository, ProductsRepository, TicketsRepository, UsersRepository } from '../repositories/index.js';
import { v4 as uuidv4 } from 'uuid';
import {logger} from '../utils/logger.js'
//uuidv4();

export const getCartById = async (req= request, res= response) => {
    try {
        const {_id} = req;
        const {cid} = req.params;

        const usuario = await UsersRepository.getUserById(_id);
        if(!usuario) return res.status(400).json({ok: false, msg:'Usuario no existe'});
        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: 'Carrito no valido'});

        const carrito = await CartsRepository.getCartById(cid);
        
        return res.json({carrito});
        
    } catch (error) {
        return res.status(500).json({msg:'Hablar con admin'});
    }
}

//export const createCart = async (req= request, res= response) => {
//    try {
//        const carrito = await CartsRepository.createCart();
//        return res.json({msg:'Carrito creado', carrito});
//    } catch (error) {
//        return res.status(500).json({msg:'Hablar con admin'});
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
            return res.status(404).json({msg:`el carrito con id ${cid} no existe`});

        return res.json({msg: 'carrito actualizado', carrito});
    } catch (error) {
        return res.status(500).json({msg:'Hablar con admin'});
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

        return res.json({msg: ' Producto eliminado del carrito', carrito});
    } catch (error) {
        return res.status(500).json({msg:'Hablar con admin'});
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
            return res.status(404).json({msg:'La propuedad quantity es obligatoria y debe ser un numero entero'});

        const carrito = await CartsRepository.updateProductsInCart(cid, pid, quantity);

        if(!carrito)
            return res.status(404).json({msg: 'No se pudo realizar esa operacion'});
        
        return res.json({msg: ' Producto actualizado en el carrito', carrito});

    } catch (error) {
        return res.status(500).json({msg:'Hablar con admin'});
    }
}

//export const deleteCart = async (req= request, res= response) => {
//    try {
//        const {cid} = req.params;
//
//        const carrito = await CartsRepository.deleteCart(cid);
//
//        if(!carrito)
//            return res.status(404).json({msg: 'No se pudo realizar esa operacion'});
//        return res.json({msg: ' Producto actualizado en el carrito', carrito});
//    } catch (error) {
//        return res.status(500).json({msg:'Hablar con admin'});
//    }
//}

export const finalizarCompra = async (req= request, res= response) => {
    try {
        
        const {_id} = req;
        const {cid} = req.params;

        const usuario = await UsersRepository.getUserById(_id);
        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg: 'Carrito no es valido'});

        const carrito = await CartsRepository.getCartById(cid);
        if(!(carrito.products.length > 0)) return res.status(400).json({ok:false, msg: 'No se puede finalizar la compra, carrito vacio', carrito});

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
        items.forEach(element => {amount+=element.total});
        
        const purchase = usuario.email;

        const code = uuidv4();
        await TicketsRepository.createTicket({items,amount,purchase,code});

        await CartsRepository.deleteAllProductsInCart(usuario.idCart);

        return res.json({ok:true, msg: 'Compra generada', ticket: {code, cliente:purchase, items, amount}});
    } catch (error) {
        logger.error(error);
        return res.status(500).json({msg:'Hablar con admin'});
    }
}