import productSchema from "../models/products.js";


 const getProducts = async (req,res)=>{
    try{
        const products = await productSchema.find();
    
           return res.status(200).send({message:"Fetch Data Successfully ",success:true,data:products});


    }catch(err){
        res.status(500).send({message:"Internal Server Error "+ err.message,success:false});
    }


};

export default getProducts
