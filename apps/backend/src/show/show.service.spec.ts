import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { CursorModule } from '@src/cursor/cursor.module';
import { ShowService } from './show.service';
import { NotFoundException } from '@nestjs/common';
import exp from 'constants';
import { CommonConstants } from '@repo/dto';
import { TEST_TAG_LABELS } from '@src/tags/tag.seed';

describe('ShowService', () => {
  let service: ShowService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CursorModule],
    }).compile();

    service = testingModule.get<ShowService>(ShowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('쇼 생성', () => {
    it('쇼를 생성할 수 있어야 한다.', async () => {
      const title = 'test-show';
      const description = 'test description';
      const labels = TEST_TAG_LABELS.slice(0, 2);
      const tags = await findTags({ service, labels });

      const result = await service.create({
        title,
        description,
        tagIds: tags.map((tag) => tag.id),
      });

      expect(result).toBeDefined();
      expect(result.show.title).toBe(title);
      expect(result.show.description).toBe(description);
      expect(result.show.showTags.length).toBe(tags.length);
      expect(result.show.showTags.every((tag) => labels.includes(tag.tag.label))).toBeTruthy();
    });
  });

  describe('쇼 단건조회', () => {
    it('쇼를 찾을 수 있어야 한다.', async () => {
      const title = 'test-show2';
      const description = 'test description';
      const { show } = await service.create({
        title,
        description,
        tagIds: [],
      });

      const result = await service.findOne({ id: show.id });

      expect(result).toBeDefined();
      expect(result.show.title).toBe(title);
    });
  });

  describe('쇼 삭제', () => {
    it('쇼를 삭제할 수 있어야 한다.', async () => {
      const title = 'test-show3';
      const description = 'test description';
      const { show } = await service.create({
        title,
        description,
        tagIds: [],
      });

      await service.remove({ id: show.id });

      await expect(service.findOne({ id: show.id })).rejects.toThrow(NotFoundException);
    });
  });

  describe('쇼 수정', () => {
    it('쇼를 수정할 수 있어야 한다.', async () => {
      const title = 'test-show4';
      const description = 'test description';
      const labels = TEST_TAG_LABELS.slice(0, 2);
      const tags = await findTags({ service, labels });

      const { show } = await service.create({
        title,
        description,
        tagIds: tags.map((tag) => tag.id),
      });

      const result = await service.update({
        id: show.id,
        title: 'updated-show',
        description: 'updated description',
        tagIds: [],
      });

      expect(result).toBeDefined();
      expect(result.show.title).toBe('updated-show');
      expect(result.show.showTags.length).toBe(0);
    });
  });
});

async function findTags({ labels, service }: { service: ShowService; labels: string[] }) {
  const prisma = service['prisma'];

  return await prisma.tag.findMany({ where: { label: { in: labels } } });
}
