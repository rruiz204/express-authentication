import { type Environment } from "./app";

interface IDatabase {
  db_name: Environment;
  db_url: Environment;
}

const main_database: IDatabase = {
  db_name: process.env.DB_MAIN_NAME,
  db_url: process.env.MAIN_DATABASE_URL,
};

const test_database: IDatabase = {
  db_name: process.env.DB_TEST_NAME,
  db_url: process.env.TEST_DATABASE_URL,
};

const database = {
  prisma_url: process.env.PRISMA_DATABASE_URL,
  main: { ...main_database },
  test: { ...test_database },
};

export default database;