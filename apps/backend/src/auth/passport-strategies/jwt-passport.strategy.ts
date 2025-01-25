////////////////////////////////////////////////////////////////////////////////
// jwt.strategy.ts
// 2024. 11. 22. created by Malloc72P
// -----------------------------------------------------------------------------
// Copyright (c) 2024 Wooritech Inc.
// All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { BaseConstants } from '@src/base/base.constant';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * 액세스 토큰으로 로그인 여부를 검사하는 전략
 */
@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: configService.get('authSecret'),
    });
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }
}
