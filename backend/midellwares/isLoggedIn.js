import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

function isLoggedIn(req, res, next) {
   
    try {
        if (!req.cookies.token) {


            return res.status(401).send({ message: "Unauthorized User ", success: false });

        }

        let decode = jwt.verify(req.cookies.token, process.env.JWT_TOKEN);
        req.user = decode;
        return next();


    } catch (err) {
        res.status(500).send({ message: err.message, success: false })
    }

}

export default isLoggedIn
