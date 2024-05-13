import yargs from "yargs";
import runner from "./runner";

interface IEnv {
  main: string | undefined;
  test: string | undefined;
}

const dbs: IEnv = {
  main: process.env.DB_MAIN_NAME,
  test: process.env.DB_TEST_NAME,
}

const urls: IEnv = {
  main: process.env.MAIN_DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
};

const args = yargs(process.argv.slice(2)).options({
  db: { type: "string" },
}).parseSync();

const multiline =
`You must set the following variables in your .env
- DB_MAIN_NAME
- DB_TEST_NAME`;


console.log("Running migrations...");

if (args.db == "all") {
  try {
    if (!dbs.main && !dbs.test) throw new Error(multiline);

    if (!dbs.main) throw new Error("You must to set the DB_MAIN_NAME variable in your .env");

    if (!dbs.test) throw new Error("You must to set the DB_TEST_NAME variable in your .env");

    await runner(urls.main as string);
    console.log("Main Migrations \udb80\udd2c");

    await runner(urls.test as string);
    console.log("Test Migrations \udb80\udd2c");

    console.log("All migrations are ready!");
  } catch (error: any) {
    console.log(error.message);
  }
}


if (args.db == "test") {
  try {
    if (!dbs.test) throw new Error("You must to set the DB_TEST_NAME variable in your .env");

    await runner(urls.test as string);
    console.log("Test Migrations \udb80\udd2c");

    console.log("All migrations are ready!");
  } catch (error: any) {
    console.log(error.message);
  }
}