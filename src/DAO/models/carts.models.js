import mongoose from "mongoose"

const cartCollection = "carts"
const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "productos"
                },
                quantity: Number
            }
        ],
        default: []
    }
})

cartSchema.pre("findOne", function () {
    this.populate("productos.producto")
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel