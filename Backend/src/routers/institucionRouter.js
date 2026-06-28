import { Router } from "express";
import { cargarDatos, editarEstado, obtenerinstituciones } from "../controllers/Institucion.Controller.js";

export const RouterInstitucion = Router();

RouterInstitucion.get("/", obtenerinstituciones);
RouterInstitucion.post("/register", cargarDatos);
RouterInstitucion.patch("/:id/estado", editarEstado);

