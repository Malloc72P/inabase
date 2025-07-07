import { PrismaClient } from '@prisma/client';

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

export async function seedTags(prisma: PrismaClient) {
  const result = await prisma.tag.createMany({
    data: GENRES.map((genere) => ({
      label: genere,
    })),
  });

  console.log('Tags seeded:', result.count, 'items created');
}
