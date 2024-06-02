import yargs from "yargs";
import database from "../config/database";
import { $ } from "bun";

const runner = async (url: string) => {
  await $`cross-env PRISMA_DATABASE_URL=${url} bunx prisma migrate dev`.quiet();
};

const args = yargs(process.argv.slice(2)).options({
  db: { type: "string" },
}).parseSync();

const exception =
`You must set the following variables in your .env
- DB_MAIN_NAME
- DB_TEST_NAME`;

console.log("Running migrations...");
try {
  if (!database.main.db_name || !database.test.db_name) throw new Error(exception);

  if (args.db == "all") {
    await runner(database.main.db_url as string);
    console.log("Main Migrations \udb80\udd2c");
  }

  await runner(database.test.db_url as string);
  console.log("Test Migrations \udb80\udd2c");

  console.log("All migrations are ready!");
} catch (error: any) {
  console.log(error.message);
}