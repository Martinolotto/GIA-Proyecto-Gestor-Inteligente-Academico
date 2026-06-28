import sequelize from "../config/DataBase.js";
import { DataTypes } from "sequelize";

export const TableRepresentante = sequelize.define("representante", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        allowNull: false,
        defaultValue: 'activo',
    },
    usuario_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "usuario",
            key: "id"
        }
    },
    institucion_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: "institucion",
            key: "id"
        }
    }
}, {
    tableName: 'representante'
})