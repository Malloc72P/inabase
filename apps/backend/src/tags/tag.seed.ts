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
  const result = await prisma.tag.createMany({
    data: TEST_TAG_LABELS.map((genere) => ({
      label: genere,
    })),
  });

  console.log('Tags seeded:', result.count, 'items created');
}
