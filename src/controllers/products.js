import { request, response } from 'express';
import { productModel } from '../models/productos.js';


export const getProduct = async (req= request, res= response) => {
        try {
            //Terminar el metodo
            //const {limit} = req.query;
            const productos = await productModel.find();
            return res.json({productos})
        } catch (error) {
            console.log('getProduct ->', error)
            return res.status(500).json({msg:"Hablar con admin"})
        }
}

export const getProductById = async (req= request, res= response) => {
    try {
        const {pid} = req.params;
        const producto = await productModel.findById(pid);
        if(!producto)
            return res.status(404).json({msg:`El producto con id ${pid} no existe`})
        return res.json({producto})
    } catch (error) {
        console.log('getProductById ->', error)
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

export const addProduct = async (req= request, res= response) => {
    try {
        const { title, description, price, img, code, stock } = req.body;
        if(!title, !description, !price, !img, !code, !stock )
            return res.status(404).json({msg:'Los campos: title, description, price, img, code, stock son obligatorios'})
        const producto = await productModel.create({title, description, price, img, code, stock})

        return res.json({producto})
    } catch (error) {
        console.log('addProduct ->', error)
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

export const updateProduct = async (req= request, res= response) => {
    try {
        const { pid } = req.params;
        const {_id, ...rest} = req.body;
        const producto = await productModel.findByIdAndUpdate(pid,{...rest},{new:true})
        
        if(producto)
            return res.json({msg: 'Producto actualizado', producto})
        return res.status(404).json({msg:`No se pudo actualizar el producto con ${pid}` })
    } catch (error) {
        console.log('updateProduct ->', error)
        return res.status(500).json({msg:"Hablar con admin"})
    }
}

export const deleteProduct = async (req= request, res= response) => {
    try {
        const { pid } = req.params;
        const producto = await productModel.findByIdAndDelete(pid);
        if(producto)
            return res.json({msg: 'Producto Eliminado', producto})
        return res.status(404).json({msg:`No se pudo eliminar el producto con ${pid}` })
    } catch (error) {
        console.log('deleteProduct ->', error)
        return res.status(500).json({msg:"Hablar con admin"})
    }
}