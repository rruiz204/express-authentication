import { PrismaClient } from '@prisma/client';

export const PrismaMain = new PrismaClient({
  datasourceUrl: process.env.MAIN_DATABASE_URL
});

export const PrismaTest = new PrismaClient({
  datasourceUrl: process.env.TEST_DATABASE_URL
});