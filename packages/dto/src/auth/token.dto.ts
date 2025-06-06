export interface TokenPayload {
  exp: number;
  iat: number;
}

export interface AccessTokenPayload extends TokenPayload {
  id: number;
  email: string;
  isAdmin: boolean;
}

export interface RefreshTokenPayload extends TokenPayload {
  id: number;
  email: string;
}
