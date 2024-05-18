import yargs from "yargs";
import runner from "./runner";
import { dbs, urls } from "./variables";

const args = yargs(process.argv.slice(2)).options({
  db: { type: "string" },
}).parseSync();

const exception =
`You must set the following variables in your .env
- DB_MAIN_NAME
- DB_TEST_NAME`;

console.log("Running migrations...");
try {
  if (!dbs.main || !dbs.test) throw new Error(exception);

  if (args.db == "all") {
    await runner(urls.main as string);
    console.log("Main Migrations \udb80\udd2c");
  }

  await runner(urls.test as string);
  console.log("Test Migrations \udb80\udd2c");

  console.log("All migrations are ready!");
} catch (error: any) {
  console.log(error.message);
}