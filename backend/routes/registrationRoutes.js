import express from "express";

import { registerUser,login,logout } from "../controllers/registerationController.js";


const route = express.Router();

route.post("/registerUser", registerUser);
route.post("/login",login );
route.get("/logout",logout)
export default route;
