import { User } from '@src/user/user.entity';

//-------------------------------------------------------------------------
// createTokens
//-------------------------------------------------------------------------
export interface AuthServiceCreateAccessTokenInput {
  user: User;
}

export interface AuthServiceCreateRefreshTokenOnput {
  accessToken: string;
  refreshToken: string;
}

//-------------------------------------------------------------------------
// validateUser
//-------------------------------------------------------------------------
export interface AuthServiceValidateUserInput {
  email: string;
  password: string;
}

export interface AuthServiceValidateUserOutput {
  accessToken: string;
  refreshToken: string;
}

//-------------------------------------------------------------------------
// refreshToken
//-------------------------------------------------------------------------
export interface AuthServiceRefreshTokenInput {
  email: string;
}

export interface AuthServiceRefreshTokenOutput {
  accessToken: string;
  refreshToken: string;
}
