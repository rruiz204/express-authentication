import { PrismaClient } from "@prisma/client";

export const MainClient = new PrismaClient({
  datasources: { db: { url: process.env.MAIN_DATABASE_URL } }
});

export const TestClient = new PrismaClient({
  datasources: { db: { url: process.env.TEST_DATABASE_URL } }
});