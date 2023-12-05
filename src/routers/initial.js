import { Router } from 'express';
import {cartIdView, 
        chatView, 
        homeView, 
        logOut, 
        loginGet, 
        loginPost, 
        productsView, 
        realTimeProductsView,
        registerGet,
        registerPost,
    } from '../controllers/initial.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', homeView)
router.get('/products', auth, productsView);
router.get('/real-time-products', auth, realTimeProductsView);
router.get('/chat', auth, chatView);
router.get('/cart/:cid', auth, cartIdView);

router.get('/login', loginGet);
router.post('/login', loginPost);
router.get('/register', registerGet);
router.post('/register', registerPost);
router.get('/logout', logOut)

router.get('*', (req, res) => {
    return res.render('404');
});

export default router;