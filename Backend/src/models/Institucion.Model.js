import { DataTypes } from "sequelize";
import sequelize from "../config/DataBase.js";

export const TableInstitucion = sequelize.define("institucion", {
    nombre_institucion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cue: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    localidad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sitio_web: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    imagen_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    requisitos: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    becas: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    documentacion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('aprobado', 'rechazado', 'pendiente'),
        allowNull: false,
        defaultValue: 'pendiente'
    }
}, {
    tableName: "institucion"
});