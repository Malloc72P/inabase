import { TestingModule, Test } from '@nestjs/testing';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { Show } from './show.entity';
import { ShowDto } from '@repo/dto';

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
      const showDtos: ShowDto[] = [
        { id: '1', title: 'Test Show 1', tags: [] },
        { id: '2', title: 'Test Show 2', tags: [] },
        { id: '3', title: 'Test Show 3', tags: [] },
      ];
      const shows = showDtos.map(({ id, title }) => createShow(id, title));
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
      const dto: ShowDto = { id: '1', title: 'Test Show 1', tags: [] };
      const show: Show = createShow(dto.id, dto.title);
      jest.spyOn(service, 'create').mockResolvedValue({ show });

      // when
      const response = await controller.create({ title: dto.title, tags: dto.tags });

      // then
      expect(response).toStrictEqual({ show: dto });
    });
  });

  describe('GET /shows/:showId', () => {
    it('특정 쇼를 ID로 조회해야 한다', async () => {
      // given
      const dto: ShowDto = { id: '1', title: 'Test Show 1', tags: [] };
      const show: Show = createShow(dto.id, dto.title);
      jest.spyOn(service, 'findOne').mockResolvedValue({ show });

      // when
      const response = await controller.showById(dto.id);

      // then
      expect(response).toStrictEqual({ show: dto });
    });
  });

  describe('PATCH /shows/:id', () => {
    it('쇼 정보를 성공적으로 수정해야 한다', async () => {
      // given
      const dto: ShowDto = { id: '1', title: 'Updated Show', tags: ['tag1'] };
      const show: Show = createShow(dto.id, dto.title, dto.tags);
      jest.spyOn(service, 'update').mockResolvedValue({ show });

      // when
      const response = await controller.update(dto.id, { title: dto.title, tags: dto.tags });

      // then
      expect(response).toStrictEqual({ show: dto });
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

function createShow(id: string, title: string, tags: string[] = []): Show {
  const show = new Show();

  show.id = id;
  show.title = title;
  show.tags = tags;

  return show;
}
