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
import { admin, auth } from '../middleware/auth.js';
import passport from 'passport';

const router = Router();

router.get('/', homeView)
router.get('/products', [auth, admin], productsView);
router.get('/real-time-products', [auth, admin], realTimeProductsView);
router.get('/chat', [auth, admin], chatView);
router.get('/cart/:cid', [auth, admin], cartIdView);

router.get('/login', loginGet);
router.get('/register', registerGet);
router.get('/logout', logOut)

router.post('/login', passport.authenticate('login',{failureRedirect:'/login'}), loginPost);
router.post('/register', passport.authenticate('register',{failureRedirect:'/register'}), registerPost);

router.get('*', (req, res) => {
    return res.render('404');
});

export default router;