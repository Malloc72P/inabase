import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '@src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { User, UserRole } from '@prisma/client';

const mockUserService = {
  create: () => true,
  findByIdOrThrow: () => {
    const user: User = {
      id: 'u01',
      name: 'aaaa',
      email: 'u01.email.com',
      role: UserRole.USER,
      password: 'user-password',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    };

    return { user };
  },
};

describe('UserApiController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('signup', () => {
    it('회원가입 테스트', async () => {
      const response = await controller.signup({
        email: 'test@inabase.com',
        name: 'test',
        password: 'password',
      });

      expect(response.result).toBe(true);
    });
  });

  describe('profile', () => {
    it('프로필 조회 테스트', async () => {
      const profile = await controller.profile({ id: '', email: '', role: '' });

      console.log(profile);

      expect(profile['password']).toBeFalsy();
    });
  });
});
