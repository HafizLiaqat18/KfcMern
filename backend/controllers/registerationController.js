import registration from "../models/registration.js";
import generateToken from "../utillities/generateToken.js";
import bcrypt from "bcrypt"

async function registerUser(req, res)  {
    try {
        let { username, email, password } = req.body;


        const findUser = await registration.findOne({ email });
        if (findUser) {
            return res.status(409).json({
                message: "User Already Registered",
                data:null, status:409,
                success: false
               
            });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = await registration.create({
            username,
            email,
            password: hashedPassword,
        });


        const token = generateToken(newUser);
        res.cookie("token", token);


        const { username: newUserUsername, email: newUserEmail, _id } = newUser;
        const data = { username: newUserUsername, email: newUserEmail, _id };

        return res.status(201).json({
            message: "User Created Successfully!",
            data: data,
            success: true
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error",
            data:null, status:500,
            success: false
        });
    }
}



async function login (req, res)  {
    try {

        const { email, password } = req.body;
        // console.log(email)
        const findUser = await registration.findOne({ email });
        if(!findUser) return res.status(404).send({message:"User not Found ",success:false,data:null, status:404});
        bcrypt.compare(password, findUser.password, function (err, result) {
            if(result){
                const token = generateToken(findUser);
                res.cookie("token", token);
                return res.status(200).send({message:"User Login Successfully", data:{email},success:true})
            }else{
                return res.status(401).send({message:"Incorrect Password",data:null, status:401,success:false})
            }
        
        });
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({message:"Internal Server Error ",success:false ,data:null, status:500})

    }
}

 function logout(req,res){
    res.cookie("token", "", { maxAge: 0, path: '/' });
    res.cookie("adminToken","",{maxAge:0,path:'/'})

    res.status(200).send({ message: 'Logged out successfully', success: true });
}



export {registerUser,login,logout}