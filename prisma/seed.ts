import { PrismaClient } from '@prisma/client';

import { redis } from '../src/config';

const prisma = new PrismaClient();

async function main() {}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
