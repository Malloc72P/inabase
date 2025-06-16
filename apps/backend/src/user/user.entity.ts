import { BaseEntity } from '@src/base/base.entity';
import { Column, Entity } from 'typeorm';

enum UserRole {
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL',
}

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: UserRole, default: UserRole.NORMAL })
  role: UserRole;

  updateProfile({ name }: { name: string }) {
    this.name = name;
  }
}
