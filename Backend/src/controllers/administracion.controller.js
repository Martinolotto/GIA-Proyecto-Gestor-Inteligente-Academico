import { TableAdministrador } from "../models/Administrador.Model.js";

let errorMessage = {
    message: "ocurrio un error intentalo nuevamente"
}

export const obtenerAdministradores = async (req, res) => {
    try {
        const datos = await TableAdministrador.findAll();
        res.json(datos);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(errorMessage);
    }
}

export const registrarAdministrador = async (req, res) => {
    try {
        const { nombre, apellido, dni, cargo, fecha_nacimiento, telefono, usuario_id } = req.body;
        const nuevo = await TableAdministrador.create({
            nombre,
            apellido,
            dni,
            cargo,
            fecha_nacimiento,
            telefono,
            usuario_id
        });
        res.json(nuevo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(errorMessage);
    }
}