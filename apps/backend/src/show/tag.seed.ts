import { faker } from '@faker-js/faker';
import { PrismaClient, Show } from '@prisma/client';
import { DateUtil } from '@repo/date-util';

export async function seedTags(prisma: PrismaClient) {
  await createTags(prisma);
  const tags = await prisma.tag.findMany();
  const shows = await prisma.show.findMany();

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

type Item = {
  title: string;
  description: string;
  createdAt: Date;
};

const GENRES = [
  'Drama',
  'Comedy',
  'Action',
  'Thriller',
  'Romance',
  'Sci-Fi',
  'Fantasy',
  'Documentary',
  'Animation',
];

async function createTags(prisma: PrismaClient) {
  const result = await prisma.tag.createMany({
    data: GENRES.map((genere) => ({
      label: genere,
    })),
  });

  console.log('Tags seeded:', result.count, 'items created');
}
