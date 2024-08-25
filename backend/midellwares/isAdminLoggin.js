import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

function isAdminLoggin(req, res, next) {
 
    try {
        if (!req.cookies.adminToken) {
            return res.status(401).send({ message: "Unauthorized User ", success: false })

        }

        let decode = jwt.verify(req.cookies.adminToken, process.env.JWT_TOKEN);
        req.admin = decode;
        return next();





    } catch (err) {
      
        res.status(500).send({ message: err.message, success: false })
    }

}

export default isAdminLoggin
