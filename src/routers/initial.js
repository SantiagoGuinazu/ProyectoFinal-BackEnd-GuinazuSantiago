import { Router } from 'express';
import {cartIdView, 
        chatView, 
        loginGet, 
        productsView, 
        realTimeProductsView,
        registerGet,
    } from '../controllers/initial.js';

const router = Router();

router.get('/products', productsView);
router.get('/real-time-products', realTimeProductsView);
router.get('/chat', chatView);
router.get('/cart/:cid', cartIdView);

router.get('/login', loginGet)
//router.post('/login', )

router.get('/register', registerGet)
//router.post('/register', )

router.get('*', (req, res) => {
    return res.render('404');
});

export default router;