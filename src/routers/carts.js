import { Router } from "express";
import { check } from "express-validator";
import { addProductCart, createIdPreference, deleteProductsInCart, finalizarCompra, getCartById, updateProductsInCart } from "../controllers/carts.js";
import { validarCampos, validarJWT } from "../middleware/auth.js";
import { existeCart } from "../helpers/db-validaciones.js";

const router = Router();

router.get("/:cid",[
    validarJWT,
    check("cid", "No es valido el ID del carrito").isMongoId(),
    validarCampos,
], getCartById);

router.post("/:cid/product/:pid", [
    validarJWT,
    check("cid", "No es valido el ID del carrito").isMongoId(),
    check("pid", "No es valido el ID del producto").isMongoId(),
    validarCampos,
], addProductCart);

router.delete("/:cid/products/:pid", [
    validarJWT,
    check("cid", "No es valido el ID del carrito").isMongoId(),
    check("pid", "No es valido el ID del producto").isMongoId(),
    validarCampos,
], deleteProductsInCart);

router.put("/:cid/products/:pid", [
    validarJWT,
    check("cid", "No es valido el ID del carrito").isMongoId(),
    check("pid", "No es valido el ID del producto").isMongoId(),
    validarCampos,
], updateProductsInCart);

router.post("/:cid/purchase", [
    validarJWT,
    check("cid", "No es valido el ID del carrito").isMongoId(),
    check("cid").custom(existeCart),
    validarCampos,
], finalizarCompra);

router.post("/create-preference/:cid",[
    validarJWT,
    check("cid", "No es valido el ID del carrito").isMongoId(),
    check("cid").custom(existeCart),
    validarCampos,
], createIdPreference);

export { router as cartsRouter };