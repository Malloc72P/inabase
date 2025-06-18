import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseComponent } from '@src/base/base.component';
import { EntityNotFound } from '@src/exceptions/common.exception';
import { PrismaService } from '@src/prisma/prisma.service';
import {
  ShowServiceCreateInput,
  ShowServiceCreateOutput,
  ShowServiceFindAllInput,
  ShowServiceFindAllOutput,
  ShowServiceFindOneInput,
  ShowServiceFindOneOutput,
  ShowServiceRemoveInput,
  ShowServiceRemoveOutput,
  ShowServiceUpdateInput,
  ShowServiceUpdateOutput,
} from './show.service.dto';
import { Prisma, Show } from '@prisma/client';
import { CursorService } from '@src/cursor/cursor.service';

export type ShowCursor = { keyword: string | undefined; createdAt: string; id: string };

@Injectable()
export class ShowService extends BaseComponent {
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
    const safeKeyword = this.buildQuery(keyword);

    const shows = await this.search(keyword, cursorObj, pageSize);

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

  async findOne({ id }: ShowServiceFindOneInput): Promise<ShowServiceFindOneOutput> {
    const show = await this.prisma.show.findUnique({ where: { id, deleted: false } });

    if (!show) {
      throw new NotFoundException('이미 삭제되었거나 존재하지 않는 쇼 입니다.');
    }

    return {
      show,
    };
  }

  async create({
    title,
    description,
    tags,
  }: ShowServiceCreateInput): Promise<ShowServiceCreateOutput> {
    const show = await this.prisma.show.create({
      data: { title, description, tags },
    });

    return { show };
  }

  async update({
    id,
    title,
    description,
    tags,
  }: ShowServiceUpdateInput): Promise<ShowServiceUpdateOutput> {
    const { show } = await this.findOne({ id });

    if (!show || show.deleted) {
      throw new EntityNotFound('쇼를 찾을 수 없습니다. 이미 삭제되었거나 존재하지 않는 쇼입니다.');
    }

    const updatedShow = await this.prisma.show.update({
      where: { id },
      data: { title, description, tags },
    });

    return { show: updatedShow };
  }

  async remove({ id }: ShowServiceRemoveInput): Promise<ShowServiceRemoveOutput> {
    const { show } = await this.findOne({ id });

    if (!show || show.deleted) {
      throw new EntityNotFound('쇼를 찾을 수 없습니다. 이미 삭제되었거나 존재하지 않는 쇼입니다.');
    }

    await this.prisma.show.update({
      where: { id },
      data: { deleted: true },
    });
  }

  //-------------------------------------------------------------------------
  // internal members
  //-------------------------------------------------------------------------
  async search(query: string = '', cursor?: ShowCursor, take = 20) {
    const q = this.prisma.buildOrQuery(query);
    const sql = Prisma.sql;
    const searchQuery = q && sql`"searchVector" @@ to_tsquery('simple', ${q})`;
    const cursorQuery =
      cursor && sql`("createdAt", id) < (${cursor.createdAt}::timestamp, ${cursor.id}::text)`;

    const where = sql`
        WHERE "deleted" = false
        ${searchQuery ? sql`AND ${searchQuery}` : sql``}
        ${cursorQuery ? sql`AND (${cursorQuery})` : sql``}
    `;

    const fullSql = sql`
        SELECT "id", "title", "description", "tags", "createdAt", "updatedAt", "deleted"
        FROM   "Show"
        ${where}
        ORDER BY "createdAt" DESC, "id" DESC
        LIMIT  ${take + 1};
    `;

    this.logger.log('Executing SQL:', fullSql.text, fullSql.values);

    const shows = this.prisma.$queryRaw<Show[]>(fullSql);

    return shows;
  }

  private buildQuery(keyword?: string) {
    if (!keyword) return undefined;

    return keyword
      ?.trim()
      .split(/\s+/)
      .map((w) => `${this.escapeTsquery(w)}`)
      .join(' | ');
  }

  private escapeTsquery(word: string) {
    return word.replace(/[&|!:()\\]/g, '\\$&');
  }
}
