import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '@src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@src/user/user.entity';
import { UserRole } from '@src/user/user.role';

const mockUserService = {
  create: () => true,
  findByIdOrThrow: () => {
    const user: User = new User();

    user.id = 'u01';
    user.name = 'aaaa';
    user.email = 'u01.email.com';
    user.role = UserRole.NORMAL;
    user.password = 'user-password';

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

      const { user: dummyUser } = mockUserService.findByIdOrThrow();

      expect(profile['password']).toBeFalsy();
      expect(profile['role']).toBeFalsy();
      expect(profile['id']).toStrictEqual(dummyUser.id);
      expect(profile['email']).toStrictEqual(dummyUser.email);
      expect(profile['name']).toStrictEqual(dummyUser.name);
    });
  });
});
