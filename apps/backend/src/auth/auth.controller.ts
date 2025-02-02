import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AccessTokenPayload,
  ProfileResult,
  RefreshTokenPayload,
  RefreshTokenResult,
  SignInResult,
  SignUpParam,
  SignUpResult,
} from '@repo/dto';
import { BaseConstants } from '@src/base/base.constant';
import { BaseController } from '@src/base/base.controller';
import { transformTo } from '@src/util/transformer.util';
import { Request, Response } from 'express';
import { JwtAuthGuard, LocalAuthGuard, RefreshAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthServiceValidateUserOutput } from './auth.service.dto';
import * as ms from 'ms';
import { UserService } from '@src/user/user.service';
import { IRequester, Requester } from '@src/util/user-decorator';

@Controller('api/v1/auth')
export class AuthController extends BaseController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
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

  @Post('signup')
  async signup(@Body() dto: SignUpParam): Promise<SignUpResult> {
    const { user } = await this.userService.create({ ...dto });

    return {
      result: !!user,
    };
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
  async profile(@Requester() requester: IRequester): Promise<ProfileResult> {
    const { user } = await this.userService.findByIdOrThrow({ id: requester.id });

    return transformTo(ProfileResult, user);
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
