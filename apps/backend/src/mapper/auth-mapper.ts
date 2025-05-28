import { Profile } from '@repo/dto';
import { User } from '@src/user/user.entity';

export function toProfile(user: User): Profile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
