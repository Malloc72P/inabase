import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AccessTokenPayload,
  ProfileResult,
  RefreshTokenPayload,
  RefreshTokenResult,
  SignInResult,
} from '@repo/dto';
import { BaseConstants } from '@src/base/base.constant';
import { BaseController } from '@src/base/base.controller';
import { transformTo } from '@src/util/transformer.util';
import { Request, Response } from 'express';
import { JwtAuthGuard, LocalAuthGuard, RefreshAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthServiceValidateUserOutput } from './auth.service.dto';
import { createCookieOption } from './cookie.util';
import * as ms from 'ms';

@Controller('api/v1/auth')
export class AuthController extends BaseController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {
    super();
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  signIn(@Req() req: Request, @Res() res: Response) {
    const { user, accessToken, refreshToken } = req.user as AuthServiceValidateUserOutput;
    const expireInfo = this.calcExpireInfo();

    const result: SignInResult = {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken,
      ...expireInfo,
    };

    return res.json(result);
  }

  @Post('signout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: Response) {
    res.clearCookie(BaseConstants.token.accessTokenKey);
    res.clearCookie(BaseConstants.token.refreshTokenKey);

    res.json({ okay: true });
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.user as RefreshTokenPayload;
    const tokens = await this.authService.refreshToken(refreshToken);

    const expireInfo = this.calcExpireInfo();

    const result: RefreshTokenResult = {
      ...tokens,
      ...expireInfo,
    };

    res.json(result);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Req() req: any): ProfileResult {
    const payload: AccessTokenPayload = req.user;

    return transformTo(ProfileResult, {
      ...payload,
    });
  }

  private calcExpireInfo() {
    const now = new Date().getTime();
    const expireInString = this.configService.get('authExpireIn') as ms.StringValue;

    return {
      issuedAt: now,
      expiredAt: now + ms(expireInString),
    };
  }
}
