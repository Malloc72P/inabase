import { Module } from '@nestjs/common';
import { HasherModule } from '@src/hasher/hasher.module';
import { PrismaModule } from '@src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [HasherModule, PrismaModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
