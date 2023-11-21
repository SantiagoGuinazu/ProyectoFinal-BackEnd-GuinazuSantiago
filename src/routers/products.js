import { Router } from 'express';
import ProductManager from '../models/productos.js';

const router = Router();

const productos = new ProductManager();

router.get('/', (req, res) => {
    const { limit } = req.query;
    const p = productos.getProduct();
    let cantProductos;
    if (limit)
        cantProductos = p.slice(0, limit)
    else
        cantProductos = p;
    return res.json({ cantTotal: p.length, productos: cantProductos });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    return res.json(productos.getProductById(parseInt(id)))
});

router.post('/', (req, res) => {
    const { title, description, price, img, code, stock } = req.body;
    const result = productos.addProduct(title, description, price, img, code, stock);
    return res.json({ result });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const result = productos.updtaeProduct(parseInt(id), req.body);
    return res.json({ result });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const result = productos.deleteProduct(parseInt(id));
    return res.json({ result });
});

export default router;