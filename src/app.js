import express from 'express';
import mongoose, { mongo } from 'mongoose';
import hbs from 'hbs';
import { Server } from 'socket.io';
import __dirname from './utils.js';

import products from './routers/products.js';
import carts from './routers/carts.js';
import chats from './routers/chats.js'
import Productos from './DAO/managers/productos.js';
import messageModel from './DAO/models/messages.models.js';

const port = 8080;
const url = 'mongodb+srv://santigui2003:arquitectura10@santiagocluster.vw1wy4u.mongodb.net/'

const app = express();

const p = new Productos();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');

app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/chat', chats)

mongoose.connect(url, { dbName: "ecommerce" })
    .then(() => {
        const httpServer = app.listen(port, () => console.log(`Conectado al puerto: ${port}`))
        const socketServer = new Server(httpServer)
        socketServer.on("connection", async socket => {
            console.log("Conectado a DB")
            socket.emit("messages", await messageModel.find().lean().exec())
            socket.on("new-message", async ({ message, user }) => {
                console.log("La casa esta en Orden")
                await messageModel.create({ user, message })
                socketServer.emit("messages", await messageModel.find().lean().exec())
            })
        })
    })
    .catch(e => {
        console.error(e)
    })