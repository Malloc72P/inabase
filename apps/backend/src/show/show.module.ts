import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { CursorModule } from '@src/cursor/cursor.module';
import { ShowSearchService } from './show-search.service';

@Module({
  imports: [PrismaModule, CursorModule],
  providers: [ShowService, ShowSearchService],
  controllers: [ShowController],
  exports: [],
})
export class ShowModule {}
