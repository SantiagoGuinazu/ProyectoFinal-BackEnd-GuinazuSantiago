import { Router } from 'express';
import {cartIdView, 
        chatView, 
        loginGet, 
        loginPost, 
        productsView, 
        realTimeProductsView,
        registerGet,
        registerPost,
    } from '../controllers/initial.js';

const router = Router();

router.get('/products', productsView);
router.get('/real-time-products', realTimeProductsView);
router.get('/chat', chatView);
router.get('/cart/:cid', cartIdView);

router.get('/login', loginGet);
router.post('/login', loginPost);

router.get('/register', registerGet);
router.post('/register', registerPost);

router.get('*', (req, res) => {
    return res.render('404');
});

export default router;