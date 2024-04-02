import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import { productsRouter, cartsRouter, authRouter, ticketsRouter } from './routers/index.js'; //createPreference

import __dirname from './utils.js';
import { dbConnection } from './database/config.js';
import { logger } from './utils/logger.js';
import { requestUrl } from './middleware/logger.js';

//import { MercadoPagoConfig, Preference } from "mercadopago"; //MP
//const client = new MercadoPagoConfig({
////    accessToken:"TEST-1025489985513589-040214-5d5344453a771916918c656e3cd894be-73658950",
//});//MP

const app = express();
const PORT = process.env.PORT || 8080;

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Documentacion de la Api',
            description: 'Proyecto Ecommerce - Santiago Guiñazu'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};
const spec = swaggerJsDoc(swaggerOptions);

app.use(cors());
app.use(requestUrl);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/documentacion-api', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
//app.use('/api/create_preference', createPreference); //MP
//app.use('/api/chat', chatView);

await dbConnection();

app.listen(PORT, () => { logger.info(`Corriendo en el puerto ${PORT}`) });