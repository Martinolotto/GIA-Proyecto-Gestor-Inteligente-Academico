import { Router } from "express"; 
import { obtenerAdministradores, registrarAdministrador } from "../controllers/Administracion.Controller.js"; 

export const RouterAdminstradores = Router();

RouterAdminstradores.get("/", obtenerAdministradores);
RouterAdminstradores.post("/register", registrarAdministrador);
