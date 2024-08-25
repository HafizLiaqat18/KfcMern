import mongoose, { Schema } from "mongoose";

const categorySchema = Schema({
    id:Number,
    title:String,
    image:String,
   
})

export default mongoose.model("category",categorySchema);