import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export async function seedShowTags(prisma: PrismaClient) {
  const shows = await prisma.show.findMany();
  const tags = await prisma.tag.findMany();

  let showTagsCount = 0;

  for (const show of shows) {
    const tagCount = faker.number.int({ min: 3, max: 5 });
    const selectedTags = faker.helpers.arrayElements(tags, tagCount);

    const result = await prisma.showTag.createMany({
      data: selectedTags.map((tag) => ({
        showId: show.id,
        tagId: tag.id,
      })),
    });

    showTagsCount += result.count;
  }

  console.log('ShowTags seeded:', showTagsCount, 'items created');
}
