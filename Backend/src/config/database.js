import { Sequelize } from "sequelize";

const sequelize = new Sequelize("gia_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
