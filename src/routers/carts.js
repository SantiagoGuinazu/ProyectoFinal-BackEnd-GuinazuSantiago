import { Router } from 'express';
import { addProductCart, createCart, getCartById } from '../controllers/carts.js';

const router = Router();

router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductCart);

export default router;