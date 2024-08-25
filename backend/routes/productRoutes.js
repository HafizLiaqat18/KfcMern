import express from "express";
import getProducts from "../controllers/productContoller.js";
import isLoggedIn from "../midellwares/isLoggedIn.js";

const route = express.Router();

route.get("/",isLoggedIn,getProducts)
export default route;
