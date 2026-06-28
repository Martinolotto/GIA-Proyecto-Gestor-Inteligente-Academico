import { TableInstitucion } from "../models/institucion.js";

let errorMessage = {
    message: "ocurrio un error intentalo nuevamente"
}

export const obtenerinstituciones = async (req,res)=>{
    try {
        const traerDatos = await TableInstitucion.findAll();
        res.json(traerDatos);

        if(!traerDatos){
            return res.status(501).json(errorMessage)
        }
    } catch (error) {
        res.status(500).json(errorMessage);
    }
}


export const cargarDatos = async (req,res)=>{
    try {
        const {nombre_institucion, cue, localidad, email, imagen_url} = req.body;

    const insertarDatos = await TableInstitucion.create({
        nombre_institucion,
        cue,
        localidad,
        email,
        imagen_url
    })
    
    res.json(insertarDatos)
    
    } catch (error) {
        console.log(error.message);
        res.status(500).json(errorMessage);
    }
}

export const editarEstado = async (req,res)=>{
    try {
        const { estado } = req.body
        const encontrarInstitucion = await TableInstitucion.update({estado},{where:{id: req.params.id}})

        if(encontrarInstitucion.length === 0){
            return res.status(404).json(errorMessage);
        }

        res.json(encontrarInstitucion)
    } catch (error) {
        res.status(500).json(errorMessage)
    }
}