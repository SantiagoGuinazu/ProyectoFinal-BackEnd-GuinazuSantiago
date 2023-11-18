import mongoose from 'mongoose'

const cartCollection = 'Carrito'

const carritoSchema = new mongoose.Schema({
    products: [{
        _id: false,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Producto',
        },
        quantity: {
            required: [true, 'El cantidad del producto es obligatorio'],
            type: Number
        }
    }],
});

const CartModel = mongoose.model(cartCollection, carritoSchema)

export default CartModel