import { Router } from 'express';
import {addProductView, cartIdView, 
        chatView, 
        homeView, 
        logOut, 
        login, 
        loginGet, 
        productsView, 
        realTimeProductsView,
        registerGet,
        registerPost,
    } from '../controllers/initial.js';
import { admin, auth } from '../middleware/auth.js';
import passport from 'passport';

const router = Router();

router.get('/', homeView)
router.get('/products', [auth], productsView);
router.get('/real-time-products', [auth, admin], realTimeProductsView);
router.get('/chat', [auth], chatView);
router.get('/add-product', [auth, admin], addProductView)
router.post('/add-product', [auth, admin], addProductView)
router.get('/cart/:cid', [auth, admin], cartIdView);

router.get('/login', loginGet);
router.get('/register', registerGet);
router.get('/logout', logOut)

router.post('/login', passport.authenticate('login',{failureRedirect:'/login'}), login);
router.post('/register', passport.authenticate('register',{failureRedirect:'/register'}), registerPost);

router.get('/github', passport.authenticate('github', {scope:['user:email']}), async(req,res) => {})
router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/register'}), login)

router.get('*', (req, res) => {
    return res.render('404');
});

export default router;