import express from 'express';
import hbs from 'hbs';
import products from './routers/products.js';
import carts from './routers/carts.js';
import initial from './routers/initial.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import { dbConnection } from './database/config.js';
import { productModel } from './models/productos.js';

const app = express();
const port = 8080;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.json());

app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/', initial);

await dbConnection();

const httpServer = app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});

const io = new Server(httpServer);

io.on('connection', async (socket) => {

    const productos = await productModel.find()
    socket.emit('productos', productos);

    socket.on('agregarProducto', async (producto) => {
        const newProduct = await productModel.create({...producto})
        if(newProduct){
            productos.push(newProduct)
            socket.emit('productos', productos)
        }
    });
});