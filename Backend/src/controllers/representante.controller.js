import { TableRepresentante } from "../models/representante.js";

let errorMessage = {
    message: "ocurrio un error intentalo nuevamente"
}

export const obtenerRepresentantes = async (req, res) => {
    try {
        const datos = await TableRepresentante.findAll();
        res.json(datos);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(errorMessage);
    }
}

export const registrarRepresentante = async (req, res) => {
    try {
        const { nombre, apellido, dni, cargo, telefono, usuario_id, institucion_id } = req.body;
        const nuevo = await TableRepresentante.create({
            nombre,
            apellido,
            dni,
            cargo,
            telefono,
            usuario_id,
            institucion_id
        });
        res.json(nuevo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(errorMessage);
    }
}
