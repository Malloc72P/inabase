import { faker } from '@faker-js/faker/.';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateShowOutput, FindShowsOutput, ShowDetailDto, ShowDto } from '@repo/dto';
import { ApiExceptionPayload, ExceptionCode } from '@repo/exceptions';
import { JwtAuthGuard } from '@src/auth/auth.guard';
import { MockJwtGuard } from '@src/auth/mock-auth-guard';
import { MockTokenModule } from '@src/token/mock-token.module';
import request from 'supertest';
import { ShowSearchService } from './show-search.service';
import { ShowController } from './show.controller';
import { ShowWithTags } from './show.entity';
import { ShowService } from './show.service';

describe('ShowController', () => {
  let app: INestApplication;
  let controller: ShowController;
  let service: ShowService;
  let searchService: ShowSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockTokenModule],
      controllers: [ShowController],
      providers: [
        {
          provide: ShowService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ShowSearchService,
          useValue: {
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

    controller = module.get<ShowController>(ShowController);
    service = module.get<ShowService>(ShowService);
    searchService = module.get<ShowSearchService>(ShowSearchService);
  });

  describe('GET /shows', () => {
    it('모든 쇼 목록을 성공적으로 조회해야 한다', async () => {
      // given
      const datas = Array(3)
        .fill(null)
        .map(() => createShow());

      jest
        .spyOn(searchService, 'findAll')
        .mockResolvedValue({ shows: datas.map((d) => d.dto), hasNext: false, nextCursor: '' });

      //  when
      const api = request(app.getHttpServer()).get('/api/v1/shows?keyword=test&cursor=dummyCursor');

      // then
      await api.expect((res) => {
        const output = res.body as FindShowsOutput;

        expect(output.shows).toStrictEqual(datas.map((d) => d.dto));
      });
    });
  });

  describe('POST /shows', () => {
    it('새로운 쇼를 성공적으로 생성해야 한다', async () => {
      // given
      const { show, dto } = createShow();
      jest.spyOn(service, 'create').mockResolvedValue({ show });

      // when
      const api = request(app.getHttpServer()).post('/api/v1/shows').send({
        title: show.title,
        description: show.description,
        tags: show.showTags,
      });

      // then
      await api.expect(201).expect((res) => {
        const output = res.body as CreateShowOutput;

        expect(output.show).toStrictEqual(dto);
      });
    });

    it('잘못된 입력값으로 요청하면 400 에러가 발생해야 한다', async () => {
      // given
      const { show, dto } = createShow();
      jest.spyOn(service, 'create').mockResolvedValue({ show });

      // when
      const api = request(app.getHttpServer()).post('/api/v1/shows').send({
        title: '',
        description: show.description,
        tags: show.showTags,
      });

      // then
      await api.expect(400).expect((res) => {
        const exception = res.body as ApiExceptionPayload;

        expect(exception.code).toStrictEqual(ExceptionCode.InvalidField);
      });
    });
  });

  describe('GET /shows/:showId', () => {
    it('특정 쇼를 ID로 조회해야 한다', async () => {
      // given
      const { show, detailDto } = createShow();
      jest.spyOn(service, 'findOne').mockResolvedValue({ show });

      // when
      const api = request(app.getHttpServer()).get(`/api/v1/shows/${encodeURIComponent(show.id)}`);

      // then
      await api.expect(200).expect((res) => {
        expect(res.body).toStrictEqual({ show: detailDto });
      });
    });
  });

  describe('PATCH /shows/:id', () => {
    it('쇼 정보를 성공적으로 수정해야 한다', async () => {
      // given
      const { show: originalShow } = createShow();
      const { show: updatedShow, detailDto: updatedDto } = createShow();
      jest.spyOn(service, 'update').mockResolvedValue({ show: updatedShow });

      // when
      const api = request(app.getHttpServer()).patch(`/api/v1/shows/${originalShow.id}`).send({
        title: updatedShow.title,
        description: updatedShow.description,
        tags: updatedShow.showTags,
      });

      // then
      await api.expect(200).expect((res) => {
        expect(res.body).toStrictEqual({ show: updatedDto });
      });
    });
  });

  describe('DELETE /shows/:id', () => {
    it('쇼를 성공적으로 삭제해야 한다', async () => {
      // given
      const showId = '1';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      // when
      const api = request(app.getHttpServer()).delete(`/api/v1/shows/${showId}`);

      // then
      await api.expect(200).expect((res) => {
        expect(res.body).toStrictEqual({ success: true });
        expect(service.remove).toHaveBeenCalledWith({ id: showId });
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

function createShow() {
  const show: ShowWithTags = {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 3, max: 20 }), // 대략 200자 이내로 제한
    description: faker.lorem.paragraph(),
    deleted: false,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    showTags: [],
  };

  const dto: ShowDto = {
    id: show.id,
    title: show.title,
    tags: [],
    createdAt: show.createdAt.toISOString(),
    updatedAt: show.updatedAt.toISOString(),
  };

  const detailDto: ShowDetailDto = {
    ...dto,
    description: show.description,
    createdAt: show.createdAt.toISOString(),
    updatedAt: show.updatedAt.toISOString(),
  };

  return { show, dto, detailDto };
}
