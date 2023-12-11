import { request, response } from "express";
import { getProductsService } from "../services/products.js";
import { getCartByIdService } from "../services/carts.js";
import { getUserEmail, registerUser } from "../services/user.js";
import { createHash, isValidPassword } from "../utils/bcryptPassword.js";


export const homeView = async (req = request, res = response) => {
    const user = req.session.user;
    return res.render('home', {user})
}

export const realTimeProductsView = async (req = request, res = response) => {
    const user = req.session.user;
    return res.render('productos-real-time', {user})
}

export const chatView = async (req = request, res = response) => {
    const user = req.session.user;
    return res.render('chat', {styles: 'chat.css', user})
}

export const productsView = async (req = request, res = response) => {
    const result = await getProductsService({...req.query});
    const user = req.session.user;
    return res.render('productos', {result, user})
}

export const cartIdView = async (req = request, res = response) => {
    const {cid} = req.params;
    const carrito = await getCartByIdService(cid);
    const user = req.session.user;
    return res.render('cart', {carrito, user});
}

export const loginGet = async (req = request, res = response) => {
    if(req.session.user)
        return res.redirect('/')
    return res.render('login', {styles:'login.css'})
}

export const loginPost = async (req = request, res = response) => {
    const {email, password} = req.body;

    const user = await getUserEmail(email)

    if(user){
        if (isValidPassword(password,user.password)) {
            const userName = `${user.name} ${user.lastName}`;
            req.session.user = userName;
            req.session.rol = user.rol;
            return res.redirect('/')
        }
    }
    return res.redirect('/login')
}

export const logOut = (req = request, res = response) => {
    req.session.destroy(err => {
        if(err)
            return res.send({status: false, body: err})
        else
            return res.redirect('/login')
        
    })
}

export const registerGet = async (req = request, res = response) => {
    if(req.session.user)
        return res.redirect('/')
    return res.render('register', {styles:'login.css'})
}

export const registerPost = async (req = request, res = response) => {
    const {password, confirmPassword} = req.body;

    if(password !== confirmPassword)
        return res.redirect('/register')

    req.body.password = createHash(password)

    const user = await registerUser({...req.body})

    if(user){
        const userName = `${user.name} ${user.lastName}`;
        req.session.user = userName;
        req.session.rol = user.rol;
        return res.redirect('/')
    }

    return res.redirect('/register')
}
