import { Test, TestingModule } from '@nestjs/testing';
import { DateUtil } from '@repo/date-util';
import { AppModule } from '@src/app.module';
import { CursorModule } from '@src/cursor/cursor.module';
import { CursorService } from '@src/cursor/cursor.service';
import { ShowSearchService } from './show-search.service';
import { SEARCH_TEST_FLAG } from './show.seed';
import { ShowCursor, ShowServiceFindAllOutput } from './show.service.dto';

describe('ShowSearchService', () => {
  let service: ShowSearchService;
  let cursorService: CursorService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CursorModule],
    }).compile();

    service = testingModule.get<ShowSearchService>(ShowSearchService);
    cursorService = testingModule.get<CursorService>(CursorService);
  });

  it('초기화할 수 있어야 함', () => {
    expect(service).toBeDefined();
    expect(cursorService).toBeDefined();
  });

  describe('호출이 가능해야함', () => {
    let result: ShowServiceFindAllOutput;

    // given
    beforeEach(async () => {
      result = await service.findAll({});
    });

    it('리턴결과는 hasNext, nextCursor를 가져야함', async () => {
      expect(result.hasNext).toStrictEqual(true);
      expect(result.nextCursor).toBeDefined();
    });

    it('태그 정보를 정상적으로 가져올 수 있어야 함.', async () => {
      expect(Array.isArray(result.shows[0].tags)).toBeTruthy();
    });

    it('커서를 디코딩하면 필요한 정보가 나와야 함', async () => {
      // when
      const cursor = cursorService.decodeCursor<ShowCursor>(result.nextCursor) as ShowCursor;
      const lastShow = result.shows[result.shows.length - 1];

      // then
      expect(cursor).toBeDefined();
      expect(cursor.id).toStrictEqual(lastShow.id);
      expect(new Date(cursor.createdAt)).toStrictEqual(lastShow.createdAt);
    });

    it('다음 슬라이스를 가져올 수 있어야 함', async () => {
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

  describe('키워드 검색', () => {
    it('키워드 검색이 가능해야함', async () => {
      // when
      const result = await service.findAll({ keyword: SEARCH_TEST_FLAG });

      // then
      expect(result.shows.length).toBeGreaterThan(1);
      expect(result.shows.filter((s) => s.title.includes(SEARCH_TEST_FLAG)).length).toStrictEqual(
        result.shows.length
      );
    });
  });
});
