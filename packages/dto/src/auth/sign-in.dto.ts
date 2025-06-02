import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProfileResult } from './profile.dto';

export class SignInParam {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignInResult {
  @Expose()
  profile: ProfileResult;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  issuedAt: number;

  @Expose()
  expiredAt: number;
}
