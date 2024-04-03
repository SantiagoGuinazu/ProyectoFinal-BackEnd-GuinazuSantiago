import { Router } from 'express';
import { MercadoPagoConfig, Preference } from "mercadopago";

//import { MercadoPagoConfig, Preference } from "mercadopago"; //MP
//const client = new MercadoPagoConfig({
//   accessToken:"TEST-1025489985513589-040214-5d5344453a771916918c656e3cd894be-73658950",
//});//MP

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
                success: process.env.PORTURL_HOME_FRONT,
                failure: process.env.PORTURL_HOME_FRONT,
                pending: process.env.PORTURL_HOME_FRONT,
            },
            auto_return: 'approved'
        }

        const preference = new Preference(client)

        const result = await preference.create({ body })

        return res.json({ id: result.id })

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error del servidor' })
    }
})


/*router.post('api/create_preference', async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "USD",
                },
            ],
            back_urls: {
                success: "https://ecommerce-santiagoguinazu.onrender.com/",
                failure: "https://ecommerce-santiagoguinazu.onrender.com/",
                pending: "https://ecommerce-santiagoguinazu.onrender.com/",
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        res.json({
            id: result.id,
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
});*/

export { router as createPreference };

