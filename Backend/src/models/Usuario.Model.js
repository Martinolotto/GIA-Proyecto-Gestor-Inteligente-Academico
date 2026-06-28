import sequelize from "../config/DataBase.js";
import { DataTypes } from "sequelize";

export const TableUsarios = sequelize.define(
  "usuario",
  {
    role: {
      type: DataTypes.ENUM("administrador", "representante"),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    contrasenia: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "usuario",
  },
);
