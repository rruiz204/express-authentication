interface IEnv {
  main: string | undefined;
  test: string | undefined;
}

export const dbs: IEnv = {
  main: process.env.DB_MAIN_NAME,
  test: process.env.DB_TEST_NAME,
}

export const urls: IEnv = {
  main: process.env.MAIN_DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
};