import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import mysql2 from "mysql2";
import { Test } from "./test/index.model";

export const sequelize = new Sequelize({
  username: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  dialect: process.env.MYSQL_DIALECT as Dialect,
  password: process.env.MYSQL_PASSWORD,
  dialectModule: mysql2,
  storage: "test",
  //   models: [__dirname + "/**/*.model.ts"],
});

sequelize.addModels([Test]);
