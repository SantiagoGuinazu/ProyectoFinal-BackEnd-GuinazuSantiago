import { request, response } from 'express';
import { addProductService, deleteProductService, getProductByCodeService, getProductByIdService, getProductsService, updateProductService } from '../services/products.js';
import { cloudinary } from '../config/cloduinary.js';
import { validFileExtension } from '../utils/validFileExtension.js';
import { ProductsRepository } from "../repositories/index.js";


export const getProduct = async (req = request, res = response) => {
    try {
        const result = await ProductsRepository.getProduct({ ...req.query });
        return res.json({ result });

    } catch (error) {
        return res.status(500).json({ msg: "Hablar con admin" })
    }
}

export const getProductById = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const producto = await ProductsRepository.getProductById(pid)
        if (!producto)
            return res.status(404).json({ msg: `El producto con id ${pid} no existe` })
        return res.json({ producto })
    } catch (error) {
        console.log('getProductById ->', error)
        return res.status(500).json({ msg: "Hablar con admin" })
    }
}

export const addProduct = async (req = request, res = response) => {
    try {
        const { title, description, price, code, stock, category } = req.body;

        if (!title, !description, !price, !code, !stock, !category)
            return res.status(404).json({ msg: 'Los campos: title, description, price, img, code, stock son obligatorios' })


        const existeCode = await ProductsRepository.getProductByCodeService(code);

        if (existeCode)
            return res.status(400).json({ msg: 'El codigo ingresado ya existe en un producto' });

        if (req.file) {

            const isValidExtension = validFileExtension(req.file.originalname);

            if (!isValidExtension)
                return res.status(400).json({ msg: 'La extension no es valida' });

            const { secure_url } = await cloudinary.uploader.upload(req.file.path);
            req.body.thumbnails = secure_url;
        }

        const producto = await addProductService({ ...req.body });
        return res.json({ producto })

    } catch (error) {
        return res.status(500).json({ msg: "Hablar con admin" })
    }
}

export const updateProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const { _id, ...rest } = req.body;

        const product = await getProductByIdService(pid);

        if (!product)
            return res.status(404).json({ msg: `El producto con Id ${pid} no existe!` })

        if (req.file) {

            const isValidExtension = validFileExtension(req.file.originalname);

            if (!isValidExtension)
                return res.status(400).json({ msg: 'La extension no es valida' });

            if (product.thumbnails) {
                const url = product.thumbnails.split('/');
                const nombre = url[url.length - 1];
                const [id] = nombre.split('.');
                cloudinary.uploader.destroy(id);
            }

            const { secure_url } = await cloudinary.uploader.upload(req.file.path);
            rest.thumbnails = secure_url;
        };

        const producto = await updateProductService(pid, rest);

        if (producto)
            return res.json({ msg: 'Producto actualizado', producto })
        return res.status(404).json({ msg: `No se pudo actualizar el producto con ${pid}` })
    } catch (error) {
        return res.status(500).json({ msg: "Hablar con admin" })
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        
        const producto = await deleteProductService(pid)
        cloudinary.uploader.destroy(pid);

        if (producto)
            return res.json({ msg: 'Producto Eliminado', producto })
        return res.status(404).json({ msg: `No se pudo eliminar el producto con ${pid}` })
    } catch (error) {
        console.log('deleteProduct ->', error)
        return res.status(500).json({ msg: "Hablar con admin" })
    }
}