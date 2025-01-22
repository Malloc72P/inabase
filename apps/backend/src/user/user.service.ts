import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserServiceFindByEmailInput, UserServiceFindByEmailOutput } from './user.service.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findByEmail({ email }: UserServiceFindByEmailInput): Promise<UserServiceFindByEmailOutput> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('이미 삭제되었거나 존재하지 않는 사용자입니다.');
    }

    return { user };
  }
}
