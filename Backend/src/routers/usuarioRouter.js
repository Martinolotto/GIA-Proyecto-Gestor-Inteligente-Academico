//user router

import { Router } from "express";
import {obtnerUsuario, registrarUsuario, userSesion} from "../controllers/Usuario.Controller.js";

export const userRouter = Router();

userRouter.get("/", obtnerUsuario);
userRouter.post("/register", registrarUsuario);
userRouter.post("/login", userSesion)