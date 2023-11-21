import { Router } from 'express';
import { productModel } from '../models/productos.js';

const router = Router();

router.get('/products', async (req,res) => {
    const productos = await productModel.find().lean();
    return res.render('productos', {productos, styles:'styles.css'})
})

router.get('/real-time-products', (req,res) => {
    return res.render('productos-real-time')
})

router.get('*', (req, res) => {
    return res.render('404');
});

export default router;