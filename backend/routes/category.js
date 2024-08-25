import express from "express";
import category from "../models/category.js";
import isLoggedIn from "../midellwares/isLoggedIn.js"

const route = express.Router();

route.get("/",isLoggedIn,async (req,res)=>{
    try{
        const categories = await  category.find();
        return res.status(200).send({message:"Categories send successfully",success:true,data:categories});

    }catch(err){
        res.status(500).send({message:`Internal Server Error. ${err.message}`,success:false});
    }

});
export default route;
