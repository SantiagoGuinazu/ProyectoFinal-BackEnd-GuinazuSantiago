import { Router } from 'express';
import productModel from '../DAO/models/products.models.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const productos = await productModel.find().lean().exec()
        res.send(productos)
    }
    catch (e) {
        res.status(500).send("Error en el servidor")
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const producto = await productModel.findById(id).lean().exec()
        res.status(!producto ? 404 : 200).send(producto)
    }
    catch (e) {
        console.error("Error:", e)
        res.status(e.name == "CastError" ? 400 : 500).send(e.name == "CastError" ? "Not found" : "Error en el servidor")
    }
});

router.post('/', async (req, res) => {
    try {
        const productos = await productModel.find().lean().exec()
        if (!productos.some(p => p.code === req.body.code)) {
            if (!req.body.title || !req.body.description || !req.body.price || !req.body.code || !req.body.stock || !req.body.category) return res.status(400).json({ message: "Missed properties" })
            const newProducto = await productModel.create(req.body)
            res.status(!newProducto ? 500 : 200).send(newProducto)
        } else {
            res.status(400).json({ message: "Invalid code" })
        }
    }
    catch (e) {
        console.error("Error:", e)
        res.status(500).send("Error en el servidor")
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        let producto = await productModel.findById(id).lean().exec()
        if (req.body._id || req.body.code) return res.status(400).json({ message: "Invalid property" })
        const updatedProducto = await productModel.updateOne({ _id: id }, { ...producto, ...req.body })
        res.status(!updatedProducto ? 500 : 200).send(updatedProducto)
    }
    catch (e) {
        console.error("Error:", e)
        res.status(e.name == "CastError" ? 400 : 500).send(e.name == "CastError" ? "Not found" : "Error en el servidor")
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedProducto = await productModel.deleteOne({ _id: id })
        res.status(!deletedProducto ? 404 : 200).send(deletedProducto)
    }
    catch (e) {
        console.error("Error:", e)
        res.status(e.name == "CastError" ? 400 : 500).send(e.name == "CastError" ? "Not found" : "Error en el servidor")
    }
});

export default router;