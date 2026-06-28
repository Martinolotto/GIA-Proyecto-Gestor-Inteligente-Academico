import { Router } from "express";
import { obtenerRepresentantes, registrarRepresentante } from "../controllers/Representante.Controller.js";

export const RouterRepresentante = Router()

RouterRepresentante.get("/", obtenerRepresentantes)
RouterRepresentante.post("/register", registrarRepresentante)