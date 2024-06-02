export type Environment = string | undefined;

import { github, google } from "./social";
import { main_database, test_database } from "./database";

const config = {
  jwt_secret: process.env.JWT_SECRET,
  vite_app: process.env.VITE_APP_URL,
  prisma_database_url: process.env.PRISMA_DATABASE_URL,
  main_database: { ...main_database },
  test_database: { ...test_database },
  github: { ...github },
  google: { ...google },
};

export default config;