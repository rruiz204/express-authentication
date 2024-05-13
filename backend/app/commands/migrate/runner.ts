import { $ } from "bun";

const runner = async (url: string) => {
  await $`cross-env PRISMA_DATABASE_URL=${url} bunx prisma migrate dev`.quiet();
};

export default runner;