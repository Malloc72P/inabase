import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { EmailAlreadyInUse } from '@src/exceptions/already-exist-user.exception';
import { HasherService } from '@src/hasher/hasher.service';
import { PrismaService } from '@src/prisma/prisma.service';
import {
  UserServiceCreateInput,
  UserServiceCreateOutput,
  UserServiceFindByEmailInput,
  UserServiceFindByEmailOrThrowInput,
  UserServiceFindByEmailOrThrowOutput,
  UserServiceFindByEmailOutput,
  UserServiceFindByIdOrThrowInput,
  UserServiceFindByIdOrThrowOutput,
  UserServiceUpdateProfileInput,
} from './user.service.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private hasherService: HasherService
  ) {}

  async findByEmailOrThrow({
    email,
  }: UserServiceFindByEmailOrThrowInput): Promise<UserServiceFindByEmailOrThrowOutput> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('이미 삭제되었거나 존재하지 않는 사용자입니다.');
    }

    return { user };
  }

  async findByEmail({ email }: UserServiceFindByEmailInput): Promise<UserServiceFindByEmailOutput> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return { user };
  }

  async findByIdOrThrow({
    id,
  }: UserServiceFindByIdOrThrowInput): Promise<UserServiceFindByIdOrThrowOutput> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('이미 삭제되었거나 존재하지 않는 사용자입니다.');
    }

    return { user };
  }

  async create({
    email,
    name,
    password,
  }: UserServiceCreateInput): Promise<UserServiceCreateOutput> {
    const { user } = await this.findByEmail({ email });

    if (user) {
      throw new EmailAlreadyInUse();
    }

    const savedUser = await this.prisma.user.create({
      data: {
        email,
        name,
        role: UserRole.USER,
        password: await this.hasherService.hashPassword(password),
      },
    });

    return { user: savedUser };
  }

  async updateProfile({
    id,
    name,
  }: UserServiceUpdateProfileInput): Promise<UserServiceCreateOutput> {
    const { user } = await this.findByIdOrThrow({ id });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { name },
    });

    return { user };
  }
}
