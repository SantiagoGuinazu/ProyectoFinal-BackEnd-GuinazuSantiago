import mongoose from 'mongoose'

const productoCollection = 'producto'

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

const productModel = mongoose.model(productoCollection, productoSchema)

export default productModel