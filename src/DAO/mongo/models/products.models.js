import mongoose from 'mongoose'

const productoCollection = 'Producto'

const productoSchema = new mongoose.Schema({
    title: String,
    description: String, 
    code: String,
    price: Number, 
    status: Boolean,
    stock: Number, 
    category: String,
    thumbnails: String
});

const ProductModel = mongoose.model(productoCollection, productoSchema)

export default ProductModel