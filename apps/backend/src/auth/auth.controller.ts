import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CommonConstants,
  ProfileResult,
  ProfileResultSchema,
  RefreshTokenPayload,
  RefreshTokenResult,
  SignInResult,
  SignUpParam,
  SignUpParamSchema,
  SignUpResult,
} from '@repo/dto';
import { BaseController } from '@src/base/base.controller';
import { UserService } from '@src/user/user.service';
import { UserServiceCreateInput } from '@src/user/user.service.dto';
import { createCookieOption } from '@src/util/cookie.util';
import { transformTo } from '@src/util/transformer.util';
import { ZodInput } from '@src/util/zod-validation.pipe';
import { IRequester, Requester } from '@src/util/user-decorator';
import { Request, Response } from 'express';
import * as ms from 'ms';
import { JwtAuthGuard, LocalAuthGuard, RefreshAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthServiceValidateUserOutput } from './auth.service.dto';

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
      profile: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
      ...expireInfo,
    };

    this.setCookie(res, accessToken, refreshToken);

    return res.json(result);
  }

  @Post('signout')
  @UseGuards(JwtAuthGuard)
  async signOut(@Res() res: Response) {
    res.clearCookie(CommonConstants.token.accessTokenKey);
    res.clearCookie(CommonConstants.token.refreshTokenKey);

    res.json({ okay: true });
  }

  @Post('signup')
  @ZodInput(SignUpParamSchema)
  async signup(@Body() dto: SignUpParam): Promise<SignUpResult> {
    await this.userService.create(dto as UserServiceCreateInput);

    return {
      result: true,
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

    this.setCookie(res, tokens.accessToken, tokens.refreshToken);

    res.json(result);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Requester() requester: IRequester): Promise<ProfileResult> {
    this.logger.log('profile invoked');

    const { user } = await this.userService.findByIdOrThrow({ id: requester.id });

    return transformTo(ProfileResultSchema, user);
  }

  private calcExpireInfo() {
    const now = new Date().getTime();
    const expireInString = this.configService.get('authExpireIn') as ms.StringValue;

    return {
      issuedAt: now,
      expiredAt: now + ms(expireInString),
    };
  }

  private setCookie(res: Response, accessToken: string, refreshToken: string) {
    res.cookie(
      CommonConstants.token.accessTokenKey,
      accessToken,
      createCookieOption(this.configService)
    );

    res.cookie(
      CommonConstants.token.refreshTokenKey,
      refreshToken,
      createCookieOption(this.configService)
    );
  }
}
