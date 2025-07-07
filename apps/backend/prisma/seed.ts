import { PrismaClient } from '@prisma/client';
import { seedShowTags } from '@src/show/show-tag.seed';
import { seedShows } from '@src/show/show.seed';
import { seedTags } from '@src/tags/tag.seed';
import { seedUsers } from '@src/user/user.seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.showTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.show.deleteMany();
  await prisma.user.deleteMany();

  await seedUsers(prisma);
  await seedShows(prisma);
  await seedTags(prisma);
  await seedShowTags(prisma);
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
