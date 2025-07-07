import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '@src/auth/auth.guard';
import { MockJwtGuard } from '@src/auth/mock-auth-guard';
import { MockTokenModule } from '@src/token/mock-token.module';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

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

  afterAll(async () => {
    await app.close();
  });
});
