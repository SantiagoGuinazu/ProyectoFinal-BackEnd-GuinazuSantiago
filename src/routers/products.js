import { Router } from 'express';
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/products.js';
import { uploader } from '../config/multer.js';
import { validarJWT } from '../middleware/auth.js';

const router = Router();

router.get('/', validarJWT, getProduct);
router.get('/:pid',validarJWT, getProductById);
router.post('/', [
    validarJWT,
    uploader.single('file')
], addProduct);
router.put('/:pid', [
    validarJWT,
    uploader.single('file')
], updateProduct);
router.delete('/:pid',validarJWT, deleteProduct);

export { router as productsRouter }