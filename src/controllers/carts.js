import { request, response } from 'express';
import { cartModel } from '../models/carts.js';


export const getCartById = async (req= request, res= response) => {
    try {
        const {cid} = req.params;
        const carrito = await cartModel.findById(cid)

        if(carrito)
            return res.json({carrito})
        return res.status(404).json({msg: `el carrito con id ${cid} no existe`})
    } catch (error) {
        console.log('getCartById ->', error)
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

export const createCart = async (req= request, res= response) => {
    try {
        const carrito = await cartModel.create({});
        return res.json({msg:'Carrito creado', carrito})
    } catch (error) {
        console.log('createCart ->', error)
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

export const addProductCart = async (req= request, res= response) => {
    try {
        const { cid, pid } = req.params;
        const carrito = await cartModel.findById(cid);
        if(!carrito)
            return res.status(404).json({msg:`el carrito con id ${cid} no existe`})
        const productoInCart = carrito.products.find(p=>p.id.toHexString() === pid);

        if(productoInCart)
            productoInCart.quantity ++;
        else
            carrito.products.push({id:pid, quantity:1})
        
        carrito.save();
        return res.json({msg: "carrito actualizado", carrito})
    } catch (error) {
        console.log('addProductCart ->', error)
        return res.status(500).json({msg:"Hablar con admin"})
    }
}
