import {Schema , model} from 'mongoose';

const nameCollection = 'Producto';

const ProductoSchema = new Schema({
    title: { type: String, required: [true, 'El title del producto es obligatorio'] },
    description: { type: String, required: [true, 'La description del producto es obligatorio'] },
    code: { type: String, required: [true, 'El code del producto es obligatorio'],unique: true },
    price: { type: Number, required: [true, 'El price del producto es obligatorio'] },
    stock: { type: Number, required: [true, 'El stock del producto es obligatorio'] },
    img: [{ type: String }],
});

export const productModel = model(nameCollection, ProductoSchema)