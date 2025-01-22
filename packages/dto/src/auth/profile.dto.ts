import { Expose } from 'class-transformer';

export class ProfileResult {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  exp: number;

  @Expose()
  iat: number;
}
