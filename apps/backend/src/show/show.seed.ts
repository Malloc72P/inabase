import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Show } from './show.entity';
import { faker } from '@faker-js/faker';

export default class ShowSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const showRepository = dataSource.getRepository(Show);
    await showRepository.clear();

    const datas = generateDummyData(100);

    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      const show = new Show();

      show.deleted = false;
      show.tags = data.tags;
      show.title = data.title;

      await showRepository.save(show);
    }
  }
}

type Item = {
  title: string;
  tags: string[];
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

/**
 * faker.js로 더미 데이터 생성
 * @param count 생성할 아이템 개수
 */
export function generateDummyData(count: number): Item[] {
  const titles = new Set<string>();
  const items: Item[] = [];

  while (items.length < count) {
    // 제목 생성 (예: 영화/드라마 제목 같은 느낌)
    const title = faker.lorem
      .words(faker.number.int({ min: 2, max: 5 }))
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');

    if (titles.has(title)) continue; // 중복 방지

    titles.add(title);

    // 태그 1~3개 랜덤 선택
    const tagCount = faker.number.int({ min: 1, max: 3 });
    const tags = faker.helpers.arrayElements(GENRES, tagCount);

    items.push({ title, tags });
  }

  return items;
}
