import { Router } from "express";
import { obtnerUsuario, registrarUsuario, userSesion } from "../controllers/usuario.controller.js";
import { verificarToken, soloAdmin } from "../middleware/auth.js";

export const userRouter = Router();

userRouter.get("/", verificarToken, soloAdmin, obtnerUsuario);
userRouter.post("/register", registrarUsuario);
userRouter.post("/login", userSesion);