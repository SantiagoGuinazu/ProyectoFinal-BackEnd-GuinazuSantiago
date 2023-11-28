import { Router } from 'express';
import { getProductsService } from '../services/products.js';

const router = Router();

router.get('/products', async (req,res) => {
    const result = await getProductsService({...req.query});
    return res.render('productos', {result})
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