import { Router } from 'express';
import { logger } from '../utils/logger';

const router = Router();

router.get('/api/chat', async (req, res) => {
    try {
        
    } catch (error) {
        logger.error(error);
        res.status(500).json({error:"Error al crear la preferencia"});
    }
});

export { router as chatView };