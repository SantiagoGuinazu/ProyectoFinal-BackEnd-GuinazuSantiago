import { Router } from 'express';
import { MercadoPagoConfig, Preference } from "mercadopago";
import { logger } from '../utils/logger.js';

const router = Router();

router.post('/create_preference', async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: 'ARS',
                },
            ],
            back_urls: {
                success: process.env.PORTURLFRONT,
                failure: process.env.PORTURLFRONT,
                pending: process.env.PORTURLFRONT,
            },
            auto_return: 'approved'
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        return res.json({ id: result.id });

    } catch (error) {
        logger.error(error)
        res.status(500).json({ ok: false, msg: 'Error del servidor' })
    }
});

export { router as createPreference };