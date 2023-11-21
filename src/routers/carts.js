import { Router } from 'express';
import { addProductCart, createCart, getCartById } from '../controllers/carts.js';

const router = Router();

router.get('/:id', getCartById);
router.post('/', createCart);
router.post('/:id/product/:pid', addProductCart);

export default router;