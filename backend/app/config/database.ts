import { type Environment } from "./config";

interface IDatabase {
  db_name: Environment;
  db_url: Environment;
}

export const main_database: IDatabase = {
  db_name: process.env.DB_MAIN_NAME,
  db_url: process.env.MAIN_DATABASE_URL,
};

export const test_database: IDatabase = {
  db_name: process.env.DB_TEST_NAME,
  db_url: process.env.TEST_DATABASE_URL,
};