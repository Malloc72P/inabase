import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';

@Module({
  imports: [PrismaModule],
  providers: [ShowService],
  controllers: [ShowController],
  exports: [],
})
export class ShowModule {}
