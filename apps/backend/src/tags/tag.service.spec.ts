import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { CursorModule } from '@src/cursor/cursor.module';
import { TagService } from './tag.service';

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
});
