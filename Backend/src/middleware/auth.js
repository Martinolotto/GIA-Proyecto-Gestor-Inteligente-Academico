import jwt from "jsonwebtoken";

const JWT_SECRET = "gia_secret_2026";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token requerido." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado." });
  }
};

export const soloAdmin = (req, res, next) => {
  if (req.usuario.role !== "administrador") {
    return res.status(403).json({ message: "Acceso denegado. Solo administradores." });
  }
  next();
};

export const soloRepresentante = (req, res, next) => {
  if (req.usuario.role !== "representante") {
    return res.status(403).json({ message: "Acceso denegado. Solo representantes." });
  }
  next();
};

export const JWT_SECRET_KEY = JWT_SECRET;