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
import { Prisma } from '@prisma/client';
import { CursorService } from '@src/cursor/cursor.service';

export type ShowCursor = { createdAt: string; id: string };

@Injectable()
export class ShowService extends BaseComponent {
  constructor(
    private prisma: PrismaService,
    private cursorService: CursorService
  ) {
    super();
  }

  async findAll({ cursor, keyword }: ShowServiceFindAllInput): Promise<ShowServiceFindAllOutput> {
    const pageSize = 20;
    this.logger.debug('ShowService.findAll', { cursor, keyword });

    const cursorObj = this.cursorService.decodeCursor<ShowCursor>(cursor);

    this.logger.debug('Decoded cursor', { cursorObj });

    const where: Prisma.ShowWhereInput = {
      deleted: false,
    };

    const safeKeyword = buildQuery(keyword);

    if (keyword) {
      where.OR = [
        { title: { search: safeKeyword } },
        { description: { search: safeKeyword } },
        // { tags: { hasSome: keyword.split(' ') } },
      ];
    }

    const shows = await this.prisma.show.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }, { updatedAt: 'desc' }],
      take: pageSize + 1, // Fetch one extra to check for next page
    });

    const nextCursor =
      shows.length > 0
        ? this.cursorService.encodeCursor<ShowCursor>({
            createdAt: shows[shows.length - 1].createdAt.toISOString(),
            id: shows[shows.length - 1].id,
          })
        : '';
    const hasNext = shows.length === pageSize + 1;

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
}

function buildQuery(keyword: string) {
  return keyword
    ?.trim()
    .split(/\s+/)
    .map((w) => `${escapeTsquery(w)}:*`)
    .join(' | ');
}

function escapeTsquery(word: string) {
  return word.replace(/[&|!:()\\]/g, '\\$&');
}
