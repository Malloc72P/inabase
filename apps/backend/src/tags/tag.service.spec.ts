import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { CursorModule } from '@src/cursor/cursor.module';
import { TagService } from './tag.service';
import { NotFoundException } from '@nestjs/common';
import exp from 'constants';

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CursorModule],
    }).compile();

    service = testingModule.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('태그 생성', () => {
    it('태그를 생성할 수 있어야 한다.', async () => {
      const result = await service.create({ label: 'test-tag' });

      expect(result).toBeDefined();
      expect(result.tag.label).toBe('test-tag');
    });
  });

  describe('태그 단건조회', () => {
    it('태그를 찾을 수 있어야 한다.', async () => {
      const { tag } = await service.create({ label: 'test-tag2' });

      const result = await service.findOne({ id: tag.id });

      expect(result).toBeDefined();
      expect(result.tag.label).toBe('test-tag2');
    });
  });

  describe('태그 삭제', () => {
    it('태그를 삭제할 수 있어야 한다.', async () => {
      const { tag } = await service.create({ label: 'test-tag3' });

      await service.remove({ id: tag.id });

      await expect(service.findOne({ id: tag.id })).rejects.toThrow(NotFoundException);
    });
  });

  describe('태그 수정', () => {
    it('태그를 수정할 수 있어야 한다.', async () => {
      const { tag } = await service.create({ label: 'test-tag4' });

      const result = await service.update({ id: tag.id, label: 'updated-tag' });

      expect(result).toBeDefined();
      expect(result.tag.label).toBe('updated-tag');
    });
  });

  describe('태그 목록조회', () => {
    it('페이지네이션 조회 테스트', async () => {
      const tags = (
        await Promise.all(
          Array(10)
            .fill('')
            .map((_, i) => `0-find-all-${i + 1}`)
            .map((label) => service.create({ label }))
        )
      ).map((result) => result.tag);

      const result = await service.findAll({});

      // 첫번째 페이지 결과 확인
      expect(result).toBeDefined();
      expect(result.tags.length).toBeGreaterThanOrEqual(10);
      expect(result.pageIndex).toBe(0);
      expect(result.pageSize).toBe(20);

      // 생성한 태그는 사전순으로 맨 앞에 있으니, 전부 조회되었어야 함
      tags.forEach((tag) => {
        expect(result.tags.some((t) => t.id === tag.id && t.label === tag.label)).toBeTruthy();
      });

      // 두번째 페이지 테스트
      const result2 = await service.findAll({ pageIndex: 1 });

      // 두번째 페이지 결과 확인
      expect(result2).toBeDefined();
      expect(result2.pageIndex).toBe(1);
      expect(result2.pageSize).toBe(20);

      // 두번째 페이지에는 첫번째 페이지에서 조회된 태그가 없어야 함
      tags.forEach((tag) => {
        expect(result2.tags.some((t) => t.id === tag.id && t.label === tag.label)).toBeFalsy();
      });

      // 다음 테스트를 위해 생성한 태그 제거
      await Promise.all(tags.map((tag) => service.remove({ id: tag.id })));
    });
  });
});
