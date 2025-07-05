import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { CursorModule } from '@src/cursor/cursor.module';
import { CursorService } from '@src/cursor/cursor.service';
import { ShowService } from './show.service';

describe('ShowService', () => {
  let service: ShowService;
  let cursorService: CursorService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CursorModule],
    }).compile();

    service = testingModule.get<ShowService>(ShowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
