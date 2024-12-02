import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";


const mongoURI = process.env.MONGO_URI;


async function connectDB() {
    try {
       
       await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000, 
        });
       console.log("Connect with db")
    } catch (err) {
        console.log("Connection error")
        console.log(err.message)
        process.exit(1); 
    }
}

connectDB();

export default mongoose.connection;
