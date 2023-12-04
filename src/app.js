import express from 'express';
import hbs from 'hbs';
import products from './routers/products.js';
import carts from './routers/carts.js';
import initial from './routers/initial.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import { dbConnection } from './database/config.js';
import { messageModel } from './models/messages.js';
import 'dotenv/config';
import { addProductService, getProductsService } from './services/products.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();
const port = process.env.port;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(session({
    store: MongoStore.create({
        mongoUrl: `${process.env.URI_Mongo_DB}/${process.env.NAME_DB}`,
    }),
    secret: process.env.secret_session,
    resave: true,
    saveUninitialized: true
}))

app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/', initial);

await dbConnection();

const httpServer = app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});

const io = new Server(httpServer);

io.on('connection', async (socket) => {
    const { payload } = await getProductsService({ limit: 100 });
    const productos = payload;

    socket.emit('productos', payload);
    socket.on('agregarProducto', async (producto) => {
        const newProduct = await addProductService({ ...producto })
        if (newProduct) {
            productos.push(newProduct)
            socket.emit('productos', productos)
        }
    });

    const messages = await messageModel.find();
    socket.emit('message', messages);

    socket.on('message', async (data) => {
        const newMessage = await messageModel.create({ ...data });
        if (newMessage) {
            const messages = await messageModel.find();
            io.emit('messageLogs', messages)
        }
    })

    socket.broadcast.emit('nuevo_user');

});