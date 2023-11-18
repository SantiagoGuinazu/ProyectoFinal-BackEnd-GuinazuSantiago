import express from 'express';
import hbs from 'hbs';
import products from './routers/products.js';
import carts from './routers/carts.js';
import initial from './routers/initial.js';
import __dirname from './utils.js';
import Productos from './models/productos.js';
import { Server } from 'socket.io';

import UserModel from './models/users.models.js';
import mongoose, { mongo } from 'mongoose';

const app = express();
const port = 8080;

const p = new Productos();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/api/users', async (req, res) => { // Moongose GET
    const users = await UserModel.find()

    res.json({ status: 'success', payload: users })
})

app.post('api/users', async (req,res) => { // Moongose POST
    try{
        const data = req.body
        const result = await UserModel.create(data)
    
        res.json({status: 'success', payload: result})
    } catch(e) {
        res.status(400).json({status: 'error', error: e})
    }

})


const url = 'mongodb+srv://santigui2003:arquitectura10@santiagocluster.vw1wy4u.mongodb.net/' // Moongose
mongoose.connect(url, { dbName: 'ecommerce' })
    .then(() => {
        console.log("DB connected")
    })
    .catch(e => {
        console.error('Error connecting to DB')
    })

    app.use('/api/products', products);
    app.use('/api/carts', carts);
    app.use('/', initial);


const httpServer = app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});

const io = new Server(httpServer);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('disconnect', () => {
        console.log('El cliente se ha desconectado')
    })

    socket.emit('productos', p.getProduct());

    socket.on('productos', idProducto => {
        p.deleteProduct(parseInt(idProducto));
        socket.emit('productos', p.getProduct());
    });
});