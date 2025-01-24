import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload, ProfileResult, RefreshTokenPayload, SignInResult } from '@repo/dto';
import { BaseConstants } from '@src/base/base.constant';
import { transformTo } from '@src/util/transformer.util';
import { Request, Response } from 'express';
import { JwtAuthGuard, LocalAuthGuard, RefreshAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthServiceValidateUserOutput } from './auth.service.dto';
import { createCookieOption } from './cookie.util';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private _configService: ConfigService,
    private authService: AuthService
  ) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  signIn(@Req() req: Request, @Res() res: Response) {
    const { user, accessToken, refreshToken } = req.user as AuthServiceValidateUserOutput;

    this.setCookies(res, { accessToken, refreshToken });

    const result: SignInResult = {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken,
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

    this.setCookies(res, tokens);

    res.json({ okay: true });
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Req() req: any): ProfileResult {
    const payload: AccessTokenPayload = req.user;

    return transformTo(ProfileResult, {
      ...payload,
    });
  }

  private setCookies(res: Response, tokens: { accessToken: string; refreshToken: string }) {
    res.cookie(
      BaseConstants.token.accessTokenKey,
      tokens.accessToken,
      createCookieOption(this._configService)
    );
    res.cookie(
      BaseConstants.token.refreshTokenKey,
      tokens.refreshToken,
      createCookieOption(this._configService)
    );
  }
}
