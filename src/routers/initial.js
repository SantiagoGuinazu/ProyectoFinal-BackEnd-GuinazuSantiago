import { Router } from 'express';
import { productModel } from '../models/productos.js';

const router = Router();

/*
router.get('/', async (req,res) => {

    const limit = parseInt(req.query?.limit ?? 4)
    const page = parseInt(req.query?.page ?? 1)

    const result = await productModel.paginate({}, {
        page,
        limit,
        lean: true
    })

    result.products = result.docs
    delete result.docs

    res.render('index', result)
})*/

router.get('/products', async (req,res) => {
    const productos = await productModel.find().lean();
    return res.render('productos', {productos})
})

router.get('/real-time-products', (req,res) => {
    return res.render('productos-real-time')
})

router.get('/chat', (req,res) => {
    return res.render('chat', {styles: 'chat.css'})
})

router.get('*', (req, res) => {
    return res.render('404');
});

export default router;