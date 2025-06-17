import { TestingModule, Test } from '@nestjs/testing';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { ShowDetailDto, ShowDto } from '@repo/dto';
import { Show, UserRole } from '@prisma/client';
import { faker } from '@faker-js/faker/.';

describe('ShowController', () => {
  let controller: ShowController;
  let service: ShowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowController],
      providers: [
        {
          provide: ShowService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ShowController>(ShowController);
    service = module.get<ShowService>(ShowService);
  });

  describe('GET /shows', () => {
    it('모든 쇼 목록을 성공적으로 조회해야 한다', async () => {
      // given
      const shows: Show[] = [];
      const showDtos: ShowDto[] = [];

      for (let i = 0; i < 3; i++) {
        const { show, dto } = createShow();
        shows.push(show);
        showDtos.push(dto);
      }

      jest.spyOn(service, 'findAll').mockResolvedValue({ shows });

      //  when
      const response = await controller.shows();

      // then
      expect(response).toStrictEqual({ shows: showDtos });
    });
  });

  describe('POST /shows', () => {
    it('새로운 쇼를 성공적으로 생성해야 한다', async () => {
      // given
      const { show, dto } = createShow();
      jest.spyOn(service, 'create').mockResolvedValue({ show });

      // when
      const response = await controller.create({
        title: show.title,
        description: show.description,
        tags: show.tags,
      });

      // then
      expect(response).toStrictEqual({ show: dto });
    });
  });

  describe('GET /shows/:showId', () => {
    it('특정 쇼를 ID로 조회해야 한다', async () => {
      // given
      const { show, detailDto } = createShow();
      jest.spyOn(service, 'findOne').mockResolvedValue({ show });

      // when
      const response = await controller.showById(show.id, {
        id: '',
        email: '',
        role: UserRole.USER,
      });

      // then
      expect(response).toStrictEqual({ show: detailDto });
    });
  });

  describe('PATCH /shows/:id', () => {
    it('쇼 정보를 성공적으로 수정해야 한다', async () => {
      // given

      const { show, dto } = createShow();
      const { show: updatedShow, detailDto: updatedDto } = createShow();
      jest.spyOn(service, 'update').mockResolvedValue({ show: updatedShow });

      // when
      const response = await controller.update(dto.id, {
        title: updatedShow.title,
        description: updatedShow.description,
        tags: updatedShow.tags,
      });

      // then
      expect(response).toStrictEqual({ show: updatedDto });
    });
  });

  describe('DELETE /shows/:id', () => {
    it('쇼를 성공적으로 삭제해야 한다', async () => {
      // given
      const showId = '1';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      // when
      const response = await controller.delete(showId);

      // then
      expect(response).toStrictEqual({ success: true });
      expect(service.remove).toHaveBeenCalledWith({ id: showId });
    });
  });
});

function createShow() {
  const show: Show = {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    tags: faker.helpers.arrayElements(['tag1', 'tag2', 'tag3'], 2),
    deleted: false,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };

  const dto: ShowDto = {
    id: show.id,
    title: show.title,
    tags: show.tags,
  };

  const detailDto: ShowDetailDto = {
    ...dto,
    description: show.description,
  };

  return { show, dto, detailDto };
}
