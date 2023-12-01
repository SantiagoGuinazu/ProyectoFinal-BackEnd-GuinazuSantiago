import { Router } from 'express';
import { getProductsService } from '../services/products.js';
import { getCartByIdService } from '../services/carts.js';

const router = Router();

function justPublicWitoutSession(req, res, next) {
    if(req.session?.user) return res.redirect('/profile')
    
    return next()
}

function auth(req, res, next) {
    if(req.session?.user) return next()

    res.redirect('/login')
}

router.get('/products', async (req,res) => {
    const result = await getProductsService({...req.query});
    return res.render('productos', {result})
});

router.get('/real-time-products', (req,res) => {
    return res.render('productos-real-time')
});

router.get('/chat', (req,res) => {
    return res.render('chat', {styles: 'chat.css'})
});

router.get('/login', justPublicWitoutSession, (req, res) => {
    return res.render('login', {})
})

router.get('/register', justPublicWitoutSession, (req, res) => {
    return res.render('register', {})
})

router.get('/profile', auth, (req, res) => {
    const user = req.session.user

    res.render('profile', user)
})

router.get('/cart/:cid', async(req,res)=>{
    const {cid} = req.params;
    console.log('id del carrito:', cid)
    const carrito = await getCartByIdService(cid);
    return res.render('cart', {carrito});
});

router.get('*', (req, res) => {
    return res.render('404');
});

export default router;