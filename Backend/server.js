import express from "express";
import cors from "cors";
import sequelize from "./src/config/DataBase.js";
import './src/models/index.js';

// Routers
import { userRouter } from "./src/routers/usuarioRouter.js";
import { RouterInstitucion } from "./src/routers/institucionRouter.js";
import { RouterAdminstradores } from "./src/routers/administradorRouter.js";
import { RouterRepresentante } from "./src/routers/representanteRouter.js";

const server = express();
const PORT = 3000;

server.use(cors());
server.use(express.json());

const conexionBD = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la BD exitosa");
    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

conexionBD();

server.use('/usuarios', userRouter);
server.use("/instituciones", RouterInstitucion);
server.use("/admin", RouterAdminstradores);
server.use("/representante", RouterRepresentante);

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
