
import  jwt from "jsonwebtoken";


function generateToken (user){
    const token = jwt.sign({email:user.email,_id : user._id}, process.env.JWT_TOKEN);
    return token;

}

export default generateToken;