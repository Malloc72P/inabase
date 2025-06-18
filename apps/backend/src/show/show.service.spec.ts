import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { ShowCursor, ShowService } from './show.service';
import { CursorService } from '@src/cursor/cursor.service';
import { CursorModule } from '@src/cursor/cursor.module';
import { ShowServiceFindAllOutput } from './show.service.dto';
import { DateUtil } from '@repo/date-util';
import { SEARCH_TEST_FLAG } from './show.seed';

describe('ShowService', () => {
  let service: ShowService;
  let cursorService: CursorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CursorModule],
    }).compile();

    service = module.get<ShowService>(ShowService);
    cursorService = module.get<CursorService>(CursorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cursorService).toBeDefined();
  });

  describe('findAll', () => {
    let result: ShowServiceFindAllOutput;

    // given
    beforeEach(async () => {
      result = await service.findAll({});
    });

    it('findShows extra 1', async () => {
      expect(result.hasNext).toStrictEqual(true);
      expect(result.nextCursor).toBeDefined();
    });

    it('findShows extra 2', async () => {
      // when
      const cursor = cursorService.decodeCursor<ShowCursor>(result.nextCursor) as ShowCursor;
      const lastShow = result.shows[result.shows.length - 1];

      // then
      expect(cursor).toBeDefined();
      expect(cursor.id).toStrictEqual(lastShow.id);
      expect(new Date(cursor.createdAt)).toStrictEqual(lastShow.createdAt);
    });

    it('findShows next cursor', async () => {
      // when
      const nextResult = await service.findAll({ cursor: result.nextCursor, pageSize: 20 });

      const lastShowOfNextRes = nextResult.shows[result.shows.length - 1];
      const lastShowOfFirstRes = result.shows[result.shows.length - 1];

      const currLastShowCreatedAt = DateUtil.Dayjs(lastShowOfNextRes.createdAt);
      const prevLastShowCreatedAt = DateUtil.Dayjs(lastShowOfFirstRes.createdAt);

      // then
      expect(currLastShowCreatedAt.isBefore(prevLastShowCreatedAt)).toBeTruthy();
    });
  });

  describe('findAll with keyword', () => {
    it('findShows keyword', async () => {
      // when
      const result = await service.findAll({ keyword: SEARCH_TEST_FLAG });

      // then
      expect(result.shows.length).toBeGreaterThan(1);
    });
  });
});
