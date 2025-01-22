////////////////////////////////////////////////////////////////////////////////
// local.strategy.ts
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
 * 리프래시 토큰 존재 여부를 검사하는 전략.
 */
@Injectable()
export class RefreshPassportStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies[BaseConstants.token.refreshTokenKey];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('refresthSecret'),
    });
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }
}
