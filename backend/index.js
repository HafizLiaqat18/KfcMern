import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from "cors";
// import mongodbConfig from "./configrations/mondodbConfig.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import productsRoutes from './routes/productRoutes.js';
import categoryRoutes from "./routes/category.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONT_END_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", registrationRoutes);
app.use("/products", productsRoutes);
app.use("/category", categoryRoutes);
app.use("/admin", adminRoutes);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
