import { Router } from "express";
import {
  obtenerinstituciones,
  obtenerPendientes,
  solicitarRegistro,
  editarEstado,
  obtenerInstitucionPorId,
  editarInstitucion
} from "../controllers/institucion.controller.js";
import { verificarToken, soloAdmin, soloRepresentante } from "../middleware/auth.js";

export const RouterInstitucion = Router();

// Rutas públicas
RouterInstitucion.get("/", obtenerinstituciones);
RouterInstitucion.get("/:id", obtenerInstitucionPorId);
RouterInstitucion.post("/solicitud", solicitarRegistro);

// Solo admin
RouterInstitucion.get("/admin/pendientes", verificarToken, soloAdmin, obtenerPendientes);
RouterInstitucion.patch("/:id/estado", verificarToken, soloAdmin, editarEstado);

// Solo representante
RouterInstitucion.put("/:id", verificarToken, soloRepresentante, editarInstitucion);
