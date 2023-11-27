import { Router } from 'express';
import { addProductCart, createCart, deleteProductsInCart, getCartById, updateProductsInCart } from '../controllers/carts.js';

const router = Router();

router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductCart);
router.delete('/:cid/products/:pid', deleteProductsInCart);
router.put('/:cid/products/:pid', updateProductsInCart);
router.put('/:cid', deleteCart);

export default router;