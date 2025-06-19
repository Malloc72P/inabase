// mock-token.module.ts
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
  imports: [
    // 진짜 옵션이 필요 없으므로 임의 값 사용
    JwtModule.register({
      global: true,
      secret: 'test-secret',
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [
    {
      provide: TokenService,
      useValue: {
        sign: jest.fn().mockReturnValue('mock-token'),
        verify: jest.fn(),
      },
    },
  ],
  exports: [TokenService, JwtModule],
})
export class MockTokenModule {}
