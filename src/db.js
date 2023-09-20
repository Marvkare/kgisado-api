import { createPool } from "mysql2/promise";
import {
  DB_ONLINE_DATABASE,
  DB_ONLINE_HOST,
  DB_ONLINE_PASSWORD,
  DB_ONLINE_PORT,
  DB_ONLINE_USER,

  DB_LOCAL_DATABASE,
  DB_LOCAL_HOST,
  DB_LOCAL_PASSWORD,
  DB_LOCAL_PORT,
  DB_LOCAL_USER,
} from "./config.js";

export const pool = createPool({
  host: DB_LOCAL_HOST,
  user: DB_LOCAL_USER,
  password: DB_LOCAL_PASSWORD,
  port: DB_LOCAL_PORT,
  database: DB_LOCAL_DATABASE,
});

