//archivo principal que arranca el servidor express
// levantar el servidor express en un puerto y configurar
//debe recibir los datos de login.html, mediante POST

import express from "express";
import sequelize from "./src/config/DataBase.js";


//routers
import { userRouter } from "./src/routers/usuarioRouter.js";
import { RouterInstitucion } from "./src/routers/institucionRouter.js";
import { RouterAdminstradores } from "./src/routers/administradorRouter.js";
import { RouterRepresentante } from "./src/routers/representanteRouter.js";

//tablas
import { TableInstitucion } from "./src/models/institucion.js";
import { TableAdministrador } from "./src/models/administrador.js";
import { TableUsarios } from "./src/models/usuario.js";
import { TableRepresentante } from "./src/models/representante.js";
import './src/models/index.js';




const server = express();
const PORT = 3000;
server.use(express.json());

const conexionBD = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la BD exitosa");

    await sequelize.sync();
    console.log("Tablas creadas");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

conexionBD();

server.use('/usuarios', userRouter);
server.use("/instituciones", RouterInstitucion);
server.use("/admin", RouterAdminstradores);
server.use("/representante", RouterRepresentante)

server.listen(PORT, () => {
  console.log(`server prendido en elpuerto ${PORT}`);
});
