import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";


const mongoURI = process.env.MONGO_URI;


async function connectDB() {
    try {
       
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000, 
        });
        
    } catch (err) {
        
        process.exit(1); 
    }
}

connectDB();

export default mongoose.connection;
