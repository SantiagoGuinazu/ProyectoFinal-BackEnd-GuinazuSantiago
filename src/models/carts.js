import {Schema , model} from 'mongoose';

const nameCollection = 'Cart';

const CartSchema = new Schema({
    products:[
        {
            _id: false,
            id:{
                type:Schema.Types.ObjectId,
                ref:'Cart'
            },
            quantity: {
                type:Number,
                required:[true, 'La cantidad del producto es requerida']
            }
        }
    ]
});

export const cartModel = model(nameCollection, CartSchema)