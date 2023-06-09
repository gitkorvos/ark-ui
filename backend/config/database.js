const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("TEST " + process.env.POSTGRES_DB, process.env.POSTGRES_PORT)

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;
