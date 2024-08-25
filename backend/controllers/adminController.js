import adminSchema from "../models/adminSchema.js"
import generateToken from '../utillities/generateToken.js'
import productSchema from "../models/products.js";
import bcrypt from "bcrypt"

async function login (req, res)  {
    try {
       
        const { email, password } = req.body;
     
        const findAdmin = await adminSchema.findOne({ email });
        if(!findAdmin) return res.status(404).send({message:"Admin not Found ",success:false});
        
        bcrypt.compare(password, findAdmin.password, function (err, result) {
            if(result){
                const token = generateToken(findAdmin);
                res.cookie("adminToken",token)
                return res.status(200).send({message:"Admin Login Successfully", data:{email},success:true})
            }else{
                return res.status(401).send({message:"Incorrect Password",success:false})
            }
        
        });
    } catch (err) {
        
        return res.status(500).send({message:"Internal Server Error ",success:false })

    }
}



async function register (req, res) {
    try{

        const findAdmin = await adminSchema.find();
        if (findAdmin.length !== 0) {
         return   res.send("Admin Already Exist")
        
    }
    const {adminname,email,password}= req.body;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
            
             await adminSchema.create({
                adminname,
                email,
                password:hash
            })
            res.send("Admin created successfully")
        });
    });
   


}catch (err){
    res.status(500).send(err.message)

}

}



async function uploadProduct (req,res){
    try{

        await productSchema.create(req.body);
      return  res.status(201).send({message:"Product created Successfully!",success:true})
    }catch(err){
        
       return res.status(500).send({message:err.message,success:false})
    }
   
}

export {login,register,uploadProduct}