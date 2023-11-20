import { Router } from 'express';
import cartModel from '../DAO/models/carts.models.js';

const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const productos = await cartModel.findOne({ _id: id }).lean().exec()
        if (!productos) return res.status(404).json({ message: "Not found" })
        res.status(!productos ? 404 : 200).send(productos.productos)
    }
    catch (e) {
        console.error("Error:", e)
        res.status(e.name == "CastError" ? 400 : 500).send(e.name == "CastError" ? "Not found" : "Error en el servidor")
    }
});

router.post('/', async (req, res) => {
    try {
        const cart = await cartModel.create({ productos: req.body.productos || [], })
        res.status(!cart ? 500 : 200).send(cart)
    }
    catch (e) {
        res.status(500).send("Error en el servidor")
    }
});

router.post('/:id/product/:pid', async (req, res) => {
    try {
        const { params: { id, pid }, body: { quantity } } = req
        const cart = await cartModel.findById(id).lean().exec()
        if (!cart) return res.status(404).json({ message: "Not found" })
        const existsProducto = cart.productos.findIndex((p) => p.producto._id == pid)
        if (existsProducto == -1) {
            cart.productos.push({ producto: pid, quantity })
        } else {
            cart.productos[existsProducto].quantity += quantity
        }
        const newProductos = await cartModel.updateOne({ _id: id }, cart)
        res.status(!newProductos ? 500 : 200).send(newProductos)
    }
    catch (e) {
        console.error("Error:", e)
        res.status(e.name == "CastError" ? 400 : 500).send(e.name == "CastError" ? "Not found" : "Error en el servidor")
    }
});


export default router;