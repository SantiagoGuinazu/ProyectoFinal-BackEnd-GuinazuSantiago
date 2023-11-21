import { Router } from 'express';
import { productModel } from '../models/productos.js';

const router = Router();

router.get('/', async (req,res) => {
    const productos = productModel.find();
    return res.render('home', {productos, styles:'styles.css'})
})

router.get('/real-time-products', (req,res) => {
    return res.render('productos-real-time')
})

export default router;