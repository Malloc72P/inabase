import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  TokenServiceSignAccessTokenInput,
  TokenServiceSignRefreshTokenInput,
} from '@src/token/token.service.dto';
import { HasherService } from 'src/hasher/hasher.service';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import {
  AuthServiceCreateAccessTokenInput,
  AuthServiceCreateRefreshTokenOnput,
  AuthServiceRefreshTokenInput,
  AuthServiceRefreshTokenOutput,
  AuthServiceValidateUserInput,
  AuthServiceValidateUserOutput,
} from './auth.service.dto';

export interface TargetArtifect {
  ownerId: number;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hasherService: HasherService,
    private tokenService: TokenService
  ) {}

  /**
   * 로그인 요청을 처리한다.
   * 로그인 성공 시 유저 정보를 토큰으로 만들고 반환한다.
   */
  async validateUser({
    email,
    password,
  }: AuthServiceValidateUserInput): Promise<AuthServiceValidateUserOutput> {
    const { user } = await this.userService.findByEmail({ email: email });

    const isVerified = await this.hasherService.verifyPassword(user.password, password);

    if (!isVerified) {
      throw new UnauthorizedException('로그인 실패. 이메일 또는 비밀번호를 다시 확인해주세요.');
    }

    const tokens = await this.createTokens({ user });

    return {
      ...tokens,
      user,
    };
  }

  async refreshToken({
    email,
  }: AuthServiceRefreshTokenInput): Promise<AuthServiceRefreshTokenOutput> {
    const { user } = await this.userService.findByEmail({ email });

    return await this.createTokens({ user });
  }

  private async createTokens({
    user,
  }: AuthServiceCreateAccessTokenInput): Promise<AuthServiceCreateRefreshTokenOnput> {
    const accessTokenPayload: TokenServiceSignAccessTokenInput = {
      id: user.id,
      email: user.email,
    };

    const refreshTokenPayload: TokenServiceSignRefreshTokenInput = {
      id: user.id,
      email: user.email,
    };

    const { accessToken } = await this.tokenService.signAccessToken(accessTokenPayload);
    const { refreshToken } = await this.tokenService.signRefreshToken(refreshTokenPayload);

    return {
      accessToken,
      refreshToken,
    };
  }
}
