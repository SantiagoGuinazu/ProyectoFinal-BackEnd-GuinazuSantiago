import { Router } from 'express';
import { MercadoPagoConfig, Preference } from "mercadopago";
import { logger } from '../utils/logger';

const router = Router();

router.post('api/create_preference', async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title:req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "USD",
                },
            ],
            back_urls: {
                success:"https://ecommerce-santiagoguinazu.onrender.com/",
                failure:"https://ecommerce-santiagoguinazu.onrender.com/",
                pending:"https://ecommerce-santiagoguinazu.onrender.com/",
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({body});

        res.json({
            id: result.id,
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({error:"Error al crear la preferencia"});
    }
});

export { router as createPreference };