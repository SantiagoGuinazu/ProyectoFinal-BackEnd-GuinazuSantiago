import { Router } from 'express';
import ProductManager from '../models/productos.js';

const router = Router();

const productos = new ProductManager();

router.get('/products', (req,res) => {
    const p = productos.getProduct();
    return res.render('productos',{productos: p})
})

router.get('/real-time-products', (req,res) => {
    return res.render('productos-real-time')
})

router.get('*', (req,res) => {
    return res.render('404')
});

export default router;