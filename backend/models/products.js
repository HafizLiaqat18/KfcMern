import mongoose, { Schema } from "mongoose";

const productSchema = Schema({
    id:Number,
    categoryId:Number,
    title:String,
    description:String,
    image:String,
    price:Number
})

export default mongoose.model("products",productSchema);