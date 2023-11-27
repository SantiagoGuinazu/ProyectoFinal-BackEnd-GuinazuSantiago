import { request, response } from 'express';
import { addProductCartService, createCartService, getCartByIdService } from '../services/carts.js';

export const getCartById = async (req= request, res= response) => {
    try {
        const {cid} = req.params;
        const carrito = await getCartByIdService(cid);
        if(carrito)
            return res.json({carrito})
        return res.status(404).json({msg: `el carrito con id ${cid} no existe`})
    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

export const createCart = async (req= request, res= response) => {
    try {
        const carrito = await createCartService();
        return res.json({msg:'Carrito creado', carrito})
    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

export const addProductCart = async (req= request, res= response) => {
    try {
        const { cid, pid } = req.params;

        const carrito = await addProductCartService(cid, pid);

        if(!carrito)
            return res.status(404).json({msg:`el carrito con id ${cid} no existe`})

        return res.json({msg: "carrito actualizado", carrito})
    } catch (error) {
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

