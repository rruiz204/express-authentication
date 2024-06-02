import { PrismaClient } from "@prisma/client";
import database from "../config/database";

export const MainClient = new PrismaClient({
  datasources: { db: { url: database.main.db_url } }
});

export const TestClient = new PrismaClient({
  datasources: { db: { url: database.test.db_url } }
});