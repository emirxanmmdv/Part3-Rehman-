import mongoose from "mongoose";

const {Schema} = mongoose

const productSchema = new Schema({
    image: String,
    name: String,
    description: String,
    price: Number
})

export const sellingSchema = mongoose.model("salamtagi", productSchema)