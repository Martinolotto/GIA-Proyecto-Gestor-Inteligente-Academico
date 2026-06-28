import { TableInstitucion } from "../models/Institucion.Model.js";
import { TableUsarios } from "../models/Usuario.Model.js";
import { TableRepresentante } from "../models/Representante.Model.js";
import bcrypt from "bcrypt";

const errorMessage = { message: "Ocurrió un error. Intentalo nuevamente." };

// GET /instituciones - Listar instituciones aprobadas (público)
export const obtenerinstituciones = async (req, res) => {
  try {
    const { nombre, localidad } = req.query;
    const where = { estado: "aprobado" };

    if (nombre) {
      const { Op } = await import("sequelize");
      where.nombre_institucion = { [Op.like]: `%${nombre}%` };
    }
    if (localidad) {
      const { Op } = await import("sequelize");
      where.localidad = { [Op.like]: `%${localidad}%` };
    }

    const datos = await TableInstitucion.findAll({ where });
    res.json(datos);
  } catch (error) {
    res.status(500).json(errorMessage);
  }
};

// GET /instituciones/pendientes - Ver solicitudes pendientes (solo admin)
export const obtenerPendientes = async (req, res) => {
  try {
    const datos = await TableInstitucion.findAll({ where: { estado: "pendiente" } });
    res.json(datos);
  } catch (error) {
    res.status(500).json(errorMessage);
  }
};

// POST /instituciones/solicitud - Solicitud de registro (representante llena el form)
export const solicitarRegistro = async (req, res) => {
  try {
    const { nombre_institucion, cue, localidad, email, imagen_url, nombre_rep, apellido_rep, dni_rep, cargo_rep, telefono_rep, email_rep, contrasenia_rep } = req.body;

    // Crear la institución en estado pendiente
    const institucion = await TableInstitucion.create({
      nombre_institucion,
      cue,
      localidad,
      email,
      imagen_url: imagen_url || "https://via.placeholder.com/150",
      estado: "pendiente"
    });

    // Crear usuario del representante (bloqueado hasta que se apruebe)
    const hash = await bcrypt.hash(contrasenia_rep, 10);
    const usuario = await TableUsarios.create({
      email: email_rep,
      contrasenia: hash,
      role: "representante"
    });

    // Crear representante vinculado
    await TableRepresentante.create({
      nombre: nombre_rep,
      apellido: apellido_rep,
      dni: dni_rep,
      cargo: cargo_rep,
      telefono: telefono_rep || null,
      estado: "inactivo", // inactivo hasta que el admin apruebe
      usuario_id: usuario.id,
      institucion_id: institucion.id
    });

    res.json({ message: "Solicitud enviada correctamente. Te avisaremos cuando sea aprobada." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error al enviar solicitud: " + error.message });
  }
};

// PATCH /instituciones/:id/estado - Aprobar o rechazar (solo admin)
export const editarEstado = async (req, res) => {
  try {
    const { estado } = req.body; // "aprobado" o "rechazado"
    const { id } = req.params;

    const institucion = await TableInstitucion.findByPk(id);
    if (!institucion) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    await TableInstitucion.update({ estado }, { where: { id } });

    // Si se aprueba, activar al representante
    if (estado === "aprobado") {
      await TableRepresentante.update(
        { estado: "activo" },
        { where: { institucion_id: id } }
      );
    }

    res.json({ message: `Institución ${estado} correctamente.` });
  } catch (error) {
    res.status(500).json(errorMessage);
  }
};

// GET /instituciones/:id - Ver detalle de una institución
export const obtenerInstitucionPorId = async (req, res) => {
  try {
    const inst = await TableInstitucion.findByPk(req.params.id);
    if (!inst) return res.status(404).json({ message: "No encontrada" });
    res.json(inst);
  } catch (error) {
    res.status(500).json(errorMessage);
  }
};

// PUT /instituciones/:id - Editar datos de la institución (representante)
export const editarInstitucion = async (req, res) => {
  try {
    const { nombre_institucion, localidad, email, imagen_url } = req.body;
    await TableInstitucion.update(
      { nombre_institucion, localidad, email, imagen_url },
      { where: { id: req.params.id } }
    );
    res.json({ message: "Datos actualizados correctamente." });
  } catch (error) {
    res.status(500).json(errorMessage);
  }
};
