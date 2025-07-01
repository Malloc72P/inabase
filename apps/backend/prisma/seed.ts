import { PrismaClient } from '@prisma/client';
import { seedShows } from '@src/show/show.seed';
import { seedUsers } from '@src/user/user.seed';

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
  await seedShows(prisma);
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
