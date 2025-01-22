import { User } from './user.entity';

//-------------------------------------------------------------------------
// findByEmail
//-------------------------------------------------------------------------
export interface UserServiceFindByEmailInput {
  email: string;
}
export interface UserServiceFindByEmailOutput {
  user: User;
}
