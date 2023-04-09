import express from "express";
import {
    signup,
    login,
    loginedin,
    logout,
} from "../controllers/auth.controler.js";
export const route = express.Router();

route.post("/auth/signup", signup);
route.post("/auth/login", login);
route.get("/auth/loginedin", loginedin);
route.get("/auth/logout", logout);
