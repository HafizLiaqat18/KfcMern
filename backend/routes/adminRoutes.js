import express from "express";
import { login ,register} from "../controllers/adminController.js";

import isAdminLoggin from "../midellwares/isAdminLoggin.js";
import { uploadProduct } from "../controllers/adminController.js";
const route = express.Router();


if(process.env.NODE_ENV==="development"){
    
    route.post("/register",register )
}


route.post("/login",login );
route.post ("/upload",isAdminLoggin,uploadProduct)

export default route;