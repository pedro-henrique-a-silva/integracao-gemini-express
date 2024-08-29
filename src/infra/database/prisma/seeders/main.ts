import { PrismaClient } from '@prisma/client';
import measureSeed from './measure.seed';

const prisma = new PrismaClient();

async function main() {
  await measureSeed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
