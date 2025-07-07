import { faker } from '@faker-js/faker';
import { PrismaClient, Show } from '@prisma/client';
import { DateUtil } from '@repo/date-util';

export async function seedShows(prisma: PrismaClient) {
  const data = generateDummyData(1000);

  const result = await prisma.show.createMany({
    data,
  });

  console.log('Shows seeded:', result.count, 'items created');
}

type Item = {
  title: string;
  description: string;
  createdAt: Date;
};

export const SEARCH_TEST_FLAG = 'search-test-flag';
/**
 * faker.js로 더미 데이터 생성
 * @param count 생성할 아이템 개수
 */
export function generateDummyData(count: number): Item[] {
  const titles = new Set<string>();
  const items: Item[] = [];
  let day = DateUtil.now();

  while (items.length < count) {
    // 제목 생성 (예: 영화/드라마 제목 같은 느낌)
    const title = faker.lorem
      .words(faker.number.int({ min: 2, max: 5 }))
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');

    if (titles.has(title)) continue; // 중복 방지

    titles.add(title);

    const description = faker.lorem.paragraph({ min: 10, max: 20 });

    // 생성일은 오늘부터 현재까지, 하루씩 감소한다.
    const createdAt = day.toDate();
    day = day.subtract(1, 'day');

    items.push({ title, description, createdAt });
  }

  for (let i = 0; i < items.length; i++) {
    if (i % 10 !== 0) continue;

    // createdAt을 랜덤하게 변경
    items[i].title += ' ' + SEARCH_TEST_FLAG;
  }

  return items;
}
