import {Schema , model} from 'mongoose';
//import mongoosePaginate from 'mongoose';

const nameCollection = 'Producto';

const ProductoSchema = new Schema({
    title: { type: String, required: [true, 'El title del producto es obligatorio'] },
    description: { type: String, required: [true, 'La description del producto es obligatorio'] },
    code: { type: String, required: [true, 'El code del producto es obligatorio'], unique: true },
    price: { type: Number, required: [true, 'El price del producto es obligatorio'] },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: [true, 'El stock del producto es obligatorio'] },
    category: { type: String, required: [true, 'El category del producto es obligatorio'] },
    thumbnails: { type: String },
});

//ProductoSchema.plugin(mongoosePaginate)

export const productModel = model(nameCollection, ProductoSchema)