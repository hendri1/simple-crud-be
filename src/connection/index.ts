import * as dotenv from "dotenv";
import mysql from "mysql2";

import { IDbConfig } from "./interface";

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  console.log("there are some missing env for db config");
  if (!process.env.DB_HOST) console.log(`process.env.DB_HOST = ${process.env.DB_HOST}`);
  if (!process.env.DB_USER) console.log(`process.env.DB_USER = ${process.env.DB_USER}`);
  if (!process.env.DB_NAME) console.log(`process.env.DB_NAME = ${process.env.DB_NAME}`);
  process.exit(1);
}

const dbConfig: IDbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

export const conn = mysql.createConnection(dbConfig);
