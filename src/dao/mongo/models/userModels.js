import { Schema, model } from "mongoose";

const nameCollection = "User";

const UserSchema = new Schema({
    name:{type: String, required: [true,"El nombre es obligatorio"]},
    lastName:{type: String, required: [true,"El lastName es obligatorio"]},
    email:{type: String, required: [true,"El correo es obligatorio"], unique: true},
    age:{type: Number},
    password:{type: String, required: [true,"La contraseña es obligatoria"]},
    rol:{type: String, default: "user", enum: ["user", "admin", "premium"]},
    status:{type: Boolean, default: true},
    fechaCreacion:{type: Date, default: Date.now},
    image:{type: String},
    github: {type: Boolean, default: false},
    google: {type: Boolean, default: false},
    cart_id:{
        type:Schema.Types.ObjectId,
        ref:"Cart"
    }
});

UserSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.__v; 
        return ret;
    }
});

export const userModel = model(nameCollection, UserSchema);