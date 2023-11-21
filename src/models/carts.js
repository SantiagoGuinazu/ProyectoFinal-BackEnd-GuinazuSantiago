import {Schema , model} from 'mongoose';

const nameCollection = 'Cart';

const CartSchema = new Schema({
    _id: false,
    products:[
        {
            id:{
                type:Schema.Types.ObjectId,
                ref:'Producto'
            },
            quantity: {
                type:Number,
                required:[true, 'La cantidad del producto es requerida']
            }
        }
    ]
});

export const cartModel = model(nameCollection, CartSchema)