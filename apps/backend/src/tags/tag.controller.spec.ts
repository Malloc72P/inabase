import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '@src/auth/auth.guard';
import { MockJwtGuard } from '@src/auth/mock-auth-guard';
import { MockTokenModule } from '@src/token/mock-token.module';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag } from '@prisma/client';
import { faker } from '@faker-js/faker/.';
import { toTagDetailDto, toTagDto } from './tag-mapper';
import { CommonConstants, CreateTagOutput, FindTagsOutput, TagDetailDto, TagDto } from '@repo/dto';
import request from 'supertest';
import { ApiExceptionPayload, ExceptionCode } from '@repo/exceptions';

describe('TagController', () => {
  let app: INestApplication;
  let controller: TagController;
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockTokenModule],
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(MockJwtGuard)
      .compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /tags', () => {
    it('모든 태그 목록을 성`공적으로 조회해야 한다', async () => {
      // given
      const datas = Array(3)
        .fill(null)
        .map(() => createTag());

      jest.spyOn(service, 'findAll').mockResolvedValue({
        tags: datas.map((d) => d.tag),
        pageIndex: 0,
        pageSize: CommonConstants.paging.tag.pageSizeXl,
      });

      //  when
      const api = request(app.getHttpServer()).get('/api/v1/tags');

      // then
      await api.expect((res) => {
        const output = res.body as FindTagsOutput;

        console.log('output', output);

        expect(output.tags).toStrictEqual(datas.map((d) => d.dto));
        expect(output.pageIndex).toBe(0);
        expect(output.pageSize).toBe(CommonConstants.paging.tag.pageSizeXl);
      });
    });
  });

  describe('POST /tags', () => {
    it('새로운 태그를 성공적으로 생성해야 한다', async () => {
      // given
      const { tag, dto } = createTag();
      jest.spyOn(service, 'create').mockResolvedValue({ tag });

      // when
      const api = request(app.getHttpServer()).post('/api/v1/tags').send({
        label: tag.label,
      });

      // then
      await api.expect(201).expect((res) => {
        const output = res.body as CreateTagOutput;

        expect(output.tag).toStrictEqual(dto);
      });
    });

    it('잘못된 입력값으로 요청하면 400 에러가 발생해야 한다', async () => {
      // given
      const { tag, dto } = createTag();
      jest.spyOn(service, 'create').mockResolvedValue({ tag });

      // when
      const api = request(app.getHttpServer()).post('/api/v1/tags').send({
        label: null, // 잘못된 입력값
      });

      // then
      await api.expect(400).expect((res) => {
        const exception = res.body as ApiExceptionPayload;

        expect(exception.code).toStrictEqual(ExceptionCode.InvalidField);
      });
    });
  });

  describe('GET /tags/:tagId', () => {
    it('특정 태그를 ID로 조회해야 한다', async () => {
      // given
      const { tag, detailDto } = createTag();
      jest.spyOn(service, 'findOne').mockResolvedValue({ tag });

      // when
      const api = request(app.getHttpServer()).get(`/api/v1/tags/${encodeURIComponent(tag.id)}`);

      // then
      await api.expect(200).expect((res) => {
        expect(res.body).toStrictEqual({ tag: detailDto });
      });
    });
  });

  describe('PATCH /tags/:id', () => {
    it('태그 정보를 성공적으로 수정해야 한다', async () => {
      // given
      const { tag: originalTag } = createTag();
      const { tag: updatedTag, detailDto: updatedDto } = createTag();
      jest.spyOn(service, 'update').mockResolvedValue({ tag: updatedTag });

      // when
      const api = request(app.getHttpServer()).patch(`/api/v1/tags/${originalTag.id}`).send({
        label: updatedTag.label,
      });

      // then
      await api.expect(200).expect((res) => {
        expect(res.body).toStrictEqual({ tag: updatedDto });
      });
    });
  });

  describe('DELETE /tags/:id', () => {
    it('태그를 성공적으로 삭제해야 한다', async () => {
      // given
      const tagId = '1';
      jest.spyOn(service, 'remove').mockResolvedValue({ success: true });

      // when
      const api = request(app.getHttpServer()).delete(`/api/v1/tags/${tagId}`);

      // then
      await api.expect(200).expect((res) => {
        expect(res.body).toStrictEqual({ success: true });
        expect(service.remove).toHaveBeenCalledWith({ id: tagId });
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

function createTag() {
  const tag: Tag = {
    id: faker.string.uuid(),
    label: faker.lorem.word(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    deleted: false,
  };

  const dto: TagDto = {
    id: tag.id,
    label: tag.label,
    createdAt: tag.createdAt.toISOString(),
    updatedAt: tag.updatedAt.toISOString(),
  };
  const detailDto: TagDetailDto = {
    id: tag.id,
    label: tag.label,
    createdAt: tag.createdAt.toISOString(),
    updatedAt: tag.updatedAt.toISOString(),
  };

  return {
    tag,
    dto,
    detailDto,
  };
}
