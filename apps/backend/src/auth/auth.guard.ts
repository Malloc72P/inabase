////////////////////////////////////////////////////////////////////////////////
// auth.guard.ts
// 2024. 11. 22. created by Malloc72P
// -----------------------------------------------------------------------------
// Copyright (c) 2024 Wooritech Inc.
// All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenExpiredException } from '@src/exceptions/access-token-expired.exception';

/**
 * Local, JWT Strategy를 사용하여 토큰 검사
 * 토큰검사 전략을 사용하는 Guard 데코레이터를 여기서 작성
 *
 * Guard 객체는 추가적인 인증 허가 로직을 적용할 수 있다.(canActivate)
 */

/**
 * Local Strategy를 사용하여 로그인 여부를 검사
 * Local Strategy는 사용자 이름과 비밀번호를 사용하여 인증을 수행한다.
 * 이 Guard는 로그인 엔드포인트에 적용된다.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

/**
 * Refresh JWT Strategy를 사용하여 리프레시 토큰 검사
 * 리프레시 토큰이 유효한지 검사하고, 유효하지 않은 경우 예외를 발생시킨다.
 * 이 Guard는 리프레시 토큰을 사용하는 엔드포인트에 적용된다.
 */
@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh-jwt') {}

/**
 * JWT Strategy를 사용하여 액세스 토큰 검사
 * 액세스 토큰이 만료되었을 경우 AccessTokenExpiredException 예외를 발생시킨다.
 * 이 Guard는 JWT 인증을 필요로 하는 모든 엔드포인트에 적용된다.
 * 사용 예시:
 * @UseGuards(JwtAuthGuard)
 * @Get('protected')
 * protectedRoute(
 *    @Requester() requester: IRequester // 요청자 정보(토큰에서 추출한 페이로드)
 * ) {...}
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * 요청 거부 여부를 처리하는 메소드
   * 토큰이 만료된 경우 err가 발생한다.
   * 만약 토큰이 없었다면, user는 undefined가 된다.
   * 이 경우 AccessTokenExpiredException 예외를 발생시킨다.
   */
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new AccessTokenExpiredException();
    }

    return user;
  }
}
