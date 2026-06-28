import jwt from "jsonwebtoken";

const JWT_SECRET = "gia_secret_2026";

// Verifica que el token sea válido
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

// Solo permite administradores
export const soloAdmin = (req, res, next) => {
  if (req.usuario.role !== "administrador") {
    return res.status(403).json({ message: "Acceso denegado. Solo administradores." });
  }
  next();
};

// Solo permite representantes
export const soloRepresentante = (req, res, next) => {
  if (req.usuario.role !== "representante") {
    return res.status(403).json({ message: "Acceso denegado. Solo representantes." });
  }
  next();
};

export const JWT_SECRET_KEY = JWT_SECRET;
