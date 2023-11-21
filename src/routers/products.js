import { Router } from 'express';
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/products.js';

const router = Router();

router.get('/', getProduct);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;