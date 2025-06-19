import { Injectable } from '@nestjs/common';
import { Prisma, Show } from '@prisma/client';
import { BaseComponent } from '@src/base/base.component';
import { PrismaService } from '@src/prisma/prisma.service';
import { ShowCursor, ShowServiceFindAllInput, ShowServiceFindAllOutput } from './show.service.dto';
import { CursorService } from '@src/cursor/cursor.service';

@Injectable()
export class ShowSearchService extends BaseComponent {
  //-------------------------------------------------------------------------
  // constructors
  //-------------------------------------------------------------------------
  constructor(
    private prisma: PrismaService,
    private cursorService: CursorService
  ) {
    super();
  }

  //-------------------------------------------------------------------------
  // methods
  //-------------------------------------------------------------------------
  async findAll({ cursor, keyword }: ShowServiceFindAllInput): Promise<ShowServiceFindAllOutput> {
    const pageSize = 20;
    const cursorObj = this.cursorService.decodeCursor<ShowCursor>(cursor);
    const safeKeyword = this.prisma.buildSearchKeyword(keyword);

    const shows = await this.search(safeKeyword, cursorObj, pageSize);

    const hasNext = shows.length === pageSize + 1;
    const nextCursor =
      shows.length > 0
        ? this.cursorService.encodeCursor<ShowCursor>({
            keyword: safeKeyword,
            createdAt: shows[shows.length - 1].createdAt.toISOString(),
            id: shows[shows.length - 1].id,
          })
        : '';

    return {
      shows,
      nextCursor,
      hasNext,
    };
  }

  //-------------------------------------------------------------------------
  // internal members
  //-------------------------------------------------------------------------
  private async search(query: string = '', cursor?: ShowCursor, take = 20) {
    const { sql, join } = Prisma;

    const conditions: Prisma.Sql[] = [];

    conditions.push(sql`"deleted" = false`);

    if (query) {
      const condition = sql`"searchVector" @@ to_tsquery('simple', ${query})`;
      conditions.push(condition);
    }

    if (cursor) {
      const condition = sql`("createdAt", id) < (${cursor.createdAt}::timestamp, ${cursor.id}::text)`;
      conditions.push(condition);
    }

    const fullSql = sql`
        SELECT "id", "title", "description", "tags", "createdAt", "updatedAt", "deleted"
        FROM   "Show"
        WHERE ${join(conditions, ' AND ')}
        ORDER BY "createdAt" DESC, "id" DESC
        LIMIT  ${take + 1};
    `;

    const shows = this.prisma.$queryRaw<Show[]>(fullSql);

    return shows;
  }
}
