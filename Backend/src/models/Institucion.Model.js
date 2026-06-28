import { DataTypes} from "sequelize";
import sequelize from "../config/DataBase.js";

export const TableInstitucion = sequelize.define("institucion",{
    nombre_institucion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cue:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    localidad: {
        type: DataTypes.STRING,
        allowNull: false,
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
        unique: true,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    estado: {
        type: DataTypes.ENUM('aprobado','rechazado','pendiente'),
        allowNull: false,
        defaultValue: 'pendiente'
    }
},       {
        tableName: "institucion"
})
