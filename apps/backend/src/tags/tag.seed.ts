import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const TEST_TAG_LABELS = [
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

export async function seedTags(prisma: PrismaClient) {
  const result1 = await prisma.tag.createMany({
    data: TEST_TAG_LABELS.map((genere) => ({
      label: genere,
    })),
  });

  const set = new Set();

  const result2 = await prisma.tag.createMany({
    data: Array.from({ length: 100 }).map(() => createDummyLabel(set)),
  });

  console.log('Tags seeded:', result1.count + result2.count, 'items created');
}

function createDummyLabel(set: Set<unknown>) {
  while (true) {
    const label = faker.lorem.word();

    if (set.has(label)) continue;

    set.add(label);

    return { label };
  }
}
