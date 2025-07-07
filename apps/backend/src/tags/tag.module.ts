import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [PrismaModule],
  providers: [TagService],
  controllers: [TagController],
  exports: [],
})
export class TagModule {}
