import { TableUsarios } from "../models/Usuario.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../middleware/auth.js";

const errorMessage = { message: "Ocurrió un error inesperado" };

export const obtnerUsuario = async (req, res) => {
  try {
    const infoUsuarios = await TableUsarios.findAll({
      attributes: { exclude: ["contrasenia"] }
    });
    res.json(infoUsuarios);
  } catch (error) {
    res.status(500).json(errorMessage);
  }
};

export const registrarUsuario = async (req, res) => {
  try {
    const { email, contrasenia, role } = req.body;
    const hash = await bcrypt.hash(contrasenia, 10);
    const nuevo = await TableUsarios.create({ email, contrasenia: hash, role });
    const { contrasenia: _, ...datos } = nuevo.toJSON();
    res.json(datos);
  } catch (error) {
    res.status(400).json({ message: "Error al registrar usuario: " + error.message });
  }
};

export const userSesion = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;

    const usuario = await TableUsarios.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const passwordValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!passwordValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      JWT_SECRET_KEY,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role
      }
    });

  } catch (error) {
    res.status(500).json(errorMessage);
  }
};