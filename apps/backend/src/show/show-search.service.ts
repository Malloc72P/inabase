import { Injectable } from '@nestjs/common';
import { Prisma, Show } from '@prisma/client';
import { BaseComponent } from '@src/base/base.component';
import { PrismaService } from '@src/prisma/prisma.service';
import { ShowCursor, ShowServiceFindAllInput, ShowServiceFindAllOutput } from './show.service.dto';
import { CursorService } from '@src/cursor/cursor.service';
import { ShowWithTags } from './show.entity';
import { ShowDetailDto, ShowDto } from '@repo/dto';

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
            createdAt: shows[shows.length - 1].createdAt,
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

    conditions.push(sql`s."deleted" = false`);

    if (query) {
      const condition = sql`s."searchVector" @@ to_tsquery('simple', ${query})`;
      conditions.push(condition);
    }

    if (cursor) {
      const condition = sql`(s."createdAt", s."id") < (${cursor.createdAt}::timestamp, ${cursor.id}::text)`;
      conditions.push(condition);
    }

    const fullSql = sql`
        SELECT s."id", s."title", string_agg(t.label, ',') as tags, s."createdAt", s."updatedAt"
        FROM   "Show" s
        LEFT JOIN "ShowTag" st ON st."showId" = s."id"
        LEFT JOIN "Tag" t ON t."id" = st."tagId"
        WHERE ${join(conditions, ' AND ')}
        GROUP BY s."id"
        ORDER BY "createdAt" DESC, "id" DESC
        LIMIT  ${take + 1};
    `;

    const shows = await this.prisma.$queryRaw<any[]>(fullSql);

    shows.forEach((s) => (s.tags = s.tags ? s.tags.split(',') : []));

    return shows;
  }
}
