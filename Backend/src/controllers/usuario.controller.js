//controller usario
import { TableUsarios } from "../models/usuario.js";

let errorMessage = {
    message: "ocurrio un error inesperado" 
}

export const obtnerUsuario = async  (req,res)=>{
    try {
        let infoUsuarios = await TableUsarios.findAll()
        res.json(infoUsuarios)
        console.log(infoUsuarios);
    } catch (error) {
        res.status(500).json(errorMessage)
    }
}

export const registrarUsuario = async (req,res)=>{
    try {
        const {email , contrasenia, role} = req.body
        const insertarDatos = await TableUsarios.create({
            email,
            contrasenia,
            role
    })
    res.json(insertarDatos)
    } catch (error) {
        res.status(401).json(errorMessage)
    }
}

export const userSesion= async (req,res)=>{
    try {
        const {email, contrasenia} = req.body;
        const encontrarUser = await TableUsarios.findOne({ where: { email: email, contrasenia: contrasenia } });
        
        if (encontrarUser === null) {
            return res.status(404).json({message: "usuario no encontrado"})
        };

        res.json(encontrarUser)

    } catch (error) {
        res.status(404).json(errorMessage)
    }
}