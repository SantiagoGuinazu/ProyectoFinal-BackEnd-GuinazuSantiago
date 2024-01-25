import express from 'express';
import 'dotenv/config';

import { productsRouter, cartsRouter  } from './routers/index.js';

import __dirname from './utils.js';
import { dbConnection } from './database/config.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

await dbConnection();

app.listen(PORT, () => {console.log(`Corriendo en el puerto ${PORT}`);});