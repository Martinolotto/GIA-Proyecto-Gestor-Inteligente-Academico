import { Router } from "express";
import {
  obtenerinstituciones,
  obtenerPendientes,
  solicitarRegistro,
  editarEstado,
  obtenerInstitucionPorId,
  editarInstitucion,
  obtenerMiInstitucion
} from "../controllers/institucion.controller.js";
import { verificarToken, soloAdmin, soloRepresentante } from "../middleware/auth.js";

export const RouterInstitucion = Router();

RouterInstitucion.get("/", obtenerinstituciones);
RouterInstitucion.get("/mi-institucion", verificarToken, soloRepresentante, obtenerMiInstitucion);
RouterInstitucion.get("/admin/pendientes", verificarToken, soloAdmin, obtenerPendientes);
RouterInstitucion.get("/:id", obtenerInstitucionPorId);
RouterInstitucion.post("/solicitud", solicitarRegistro);

RouterInstitucion.patch("/:id/estado", verificarToken, soloAdmin, editarEstado);
RouterInstitucion.put("/:id", verificarToken, soloRepresentante, editarInstitucion);