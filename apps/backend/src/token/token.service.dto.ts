//-------------------------------------------------------------------------
// signAccessToken

import { AccessTokenPayload, RefreshTokenPayload } from '@repo/dto';

//-------------------------------------------------------------------------
export interface TokenServiceSignAccessTokenInput {
  id: string;
  email: string;
}

export interface TokenServiceSignAccessTokenOutput {
  accessToken: string;
}

//-------------------------------------------------------------------------
// signRefreshToken
//-------------------------------------------------------------------------
export interface TokenServiceSignRefreshTokenInput {
  id: string;
  email: string;
}

export interface TokenServiceSignRefreshTokenOutput {
  refreshToken: string;
}

//-------------------------------------------------------------------------
// decodeAccessToken
//-------------------------------------------------------------------------
export interface TokenServiceDecodeAccessTokenInput {
  token: string;
}

export interface TokenServiceDecodeAccessTokenOutput {
  accessTokenPayload: AccessTokenPayload;
}

//-------------------------------------------------------------------------
// decodeRefreshToken
//-------------------------------------------------------------------------
export interface TokenServiceDecodeRefreshTokenInput {
  token: string;
}

export interface TokenServiceDecodeRefreshTokenutput {
  refreshTokenPayload: RefreshTokenPayload;
}
