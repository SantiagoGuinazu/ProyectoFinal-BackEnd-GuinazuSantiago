import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://santigui2003:arquitectura10@santiagocluster.vw1wy4u.mongodb.net/ecommerce')
        console.log('Base de datos online')
    } catch (error) {
        console.log(`error al levantar la base de datos${error}`);
        process.exit(1)
    }
}