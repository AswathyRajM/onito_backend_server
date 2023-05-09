import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// const Sequelize = require("sequelize");
// const dotenv = require("dotenv");
dotenv.config();
const dbname = process.env.DB_NAME as string;
const user = process.env.DB_USER as string;
const host = process.env.DB_HOST as string;
const dialect = process.env.DB_DRIVER as Dialect;
const password = process.env.DB_PASS as string;

const sequelize = new Sequelize(dbname, user, password, {
  host,
  dialect,
  logging: false,
});

async function TestConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

TestConnection();

export default sequelize;
