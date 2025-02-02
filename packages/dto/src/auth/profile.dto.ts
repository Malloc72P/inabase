import { Expose } from 'class-transformer';

export class ProfileResult {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
