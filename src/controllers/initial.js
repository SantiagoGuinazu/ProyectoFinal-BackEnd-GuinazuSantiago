import { request, response } from "express";
import { addProductService, getProductByCodeService, getProductsService } from "../services/products.js";
import { getCartByIdService } from "../services/carts.js";
import { cloudinary } from "../config/cloduinary.js";
import { validFileExtension } from "../utils/validFileExtension.js";

export const homeView = async (req = request, res = response) => {
    const user = req.session.user;
    return res.render('home', { user })
}

export const realTimeProductsView = async (req = request, res = response) => {
    const user = req.session.user;
    return res.render('productos-real-time', { user })
}

export const chatView = async (req = request, res = response) => {
    const user = req.session.user;
    return res.render('chat', { styles: 'chat.css', user })
}

export const productsView = async (req = request, res = response) => {
    const result = await getProductsService({ ...req.query });
    const user = req.session.user;
    return res.render('productos', { result, user })
}

export const addProductView = async (req = request, res = response) => {
    const user = req.session.user;
    return res.render('addProduct', { user })
}

export const addProductViewPost = async (req = request, res = response) => {

    const { title, description, price, code, stock, category } = req.body;

    if (!title, !description, !price, !code, !stock, !category)
        return res.status(404).json({ msg: 'Los campos: title, description, price, img, code, stock son obligatorios' })

    const existeCode = await getProductByCodeService(code);

    if (existeCode)
        return res.status(400).json({ msg: 'El codigo ingresado ya existe en un producto' });

    if (req.file) {

        const isValidExtension = validFileExtension(req.file.originalname);

        if (!isValidExtension)
            return res.status(400).json({ msg: 'La extension no es valida' });

        const { secure_url } = await cloudinary.uploader.upload(req.file.path);
        req.body.thumbnails = secure_url;
    }

    await addProductService({ ...req.body });

    return res.redirect('/products')
}

export const cartIdView = async (req = request, res = response) => {
    const { cid } = req.params;
    const carrito = await getCartByIdService(cid);
    const user = req.session.user;
    return res.render('cart', { carrito, user });
}

export const loginGet = async (req = request, res = response) => {
    if (req.session.user)
        return res.redirect('/')
    return res.render('login', { styles: 'login.css' })
}

export const login = async (req = request, res = response) => {
    if (!req.user)
        return res.redirect('/login');

    req.session.user = {
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email,
        rol: req.user.rol,
    }

    return res.redirect('/')
}

export const logOut = (req = request, res = response) => {
    req.session.destroy(err => {
        if (err)
            return res.send({ status: false, body: err })
        else
            return res.redirect('/login')

    })
}

export const registerGet = async (req = request, res = response) => {
    if (req.session.user)
        return res.redirect('/')
    return res.render('register', { styles: 'login.css' })
}

export const registerPost = async (req = request, res = response) => {
    if (!req.user)
        return res.redirect('/register');

    return res.redirect('/login');
}