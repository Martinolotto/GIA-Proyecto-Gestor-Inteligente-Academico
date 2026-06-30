import sequelize from "../src/config/DataBase.js";
import { TableUsarios } from "../src/models/Usuario.Model.js";
import { TableAdministrador } from "../src/models/Administrador.Model.js";
import { TableInstitucion } from "../src/models/Institucion.Model.js";
import { TableRepresentante } from "../src/models/Representante.Model.js";
import "../src/models/index.js";
import bcrypt from "bcrypt";

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la BD...");
    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas...");

    const admins = [
      {
        email: "ivanemmanuelgomez2017@gmail.com",
        contrasenia: "administradorSupremo",
        nombre: "Ivan Emmanuel",
        apellido: "Gomez",
        dni: 45050884,
        cargo: "Administrador",
        fecha_nacimiento: "2000-01-01"
      },
      {
        email: "martinoblottovera1508@gmail.com",
        contrasenia: "marnoot152ba",
        nombre: "Martino Benjamin",
        apellido: "Lotto Vera",
        dni: 47548033,
        cargo: "Administrador",
        fecha_nacimiento: "2000-01-01"
      },
      {
        email: "jonathansanchez@gmail.com",
        contrasenia: "12345678",
        nombre: "Jonathan",
        apellido: "Sanchez",
        dni: 40123456,
        cargo: "Administrador",
        fecha_nacimiento: "2000-01-01"
      }
    ];

    for (const admin of admins) {
      const existe = await TableUsarios.findOne({ where: { email: admin.email } });
      if (existe) {
        console.log(`Admin ${admin.email} ya existe, se omite.`);
        continue;
      }

      const hash = await bcrypt.hash(admin.contrasenia, 10);
      const usuario = await TableUsarios.create({
        email: admin.email,
        contrasenia: hash,
        role: "administrador"
      });

      await TableAdministrador.create({
        nombre: admin.nombre,
        apellido: admin.apellido,
        dni: admin.dni,
        cargo: admin.cargo,
        fecha_nacimiento: admin.fecha_nacimiento,
        usuario_id: usuario.id
      });

      console.log(`Admin creado: ${admin.email}`);
    }

    const instituciones = [
      {
        nombre_institucion: "Instituto Politécnico Formosa",
        cue: "342-0001",
        localidad: "Formosa",
        email: "ipf@educacion.formosa.gob.ar",
        imagen_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP13LiwM-8BeJYSVjjXV-QFgpjzWsR45DfWC_UUerRXOSk4h7fn7PRa9PP&s=10",
        estado: "aprobado"
      },
      {
        nombre_institucion: "Universidad Nacional de Formosa",
        cue: "342-0002",
        localidad: "Formosa",
        email: "info@unf.edu.ar",
        imagen_url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/UNaFLogoI.jpg",
        estado: "aprobado"
      },
      {
        nombre_institucion: "Instituto Superior de Enfermería",
        cue: "342-0003",
        localidad: "Formosa",
        email: "enfermeria@isef.edu.ar",
        imagen_url: "https://cdn-icons-png.flaticon.com/512/2382/2382533.png",
        estado: "aprobado"
      }
    ];

    for (const inst of instituciones) {
      const existe = await TableInstitucion.findOne({ where: { cue: inst.cue } });
      if (existe) {
        console.log(`Institución ${inst.nombre_institucion} ya existe, se omite.`);
        continue;
      }
      await TableInstitucion.create(inst);
      console.log(`Institución creada: ${inst.nombre_institucion}`);
    }

    console.log("\n✅ Seeder completado con éxito!");
    process.exit(0);
  } catch (error) {
    console.error("Error en el seeder:", error.message);
    process.exit(1);
  }
};

seed();