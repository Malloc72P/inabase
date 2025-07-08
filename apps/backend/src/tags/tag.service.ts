import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseComponent } from '@src/base/base.component';
import { EntityNotFound } from '@src/exceptions/common.exception';
import { PrismaService } from '@src/prisma/prisma.service';
import {
  TagServiceCreateInput,
  TagServiceCreateOutput,
  TagServiceFindAllInput,
  TagServiceFindAllOutput,
  TagServiceFindOneInput,
  TagServiceFindOneOutput,
  TagServiceRemoveInput,
  TagServiceRemoveOutput,
  TagServiceUpdateInput,
  TagServiceUpdateOutput,
} from './tag.service.dto';

@Injectable()
export class TagService extends BaseComponent {
  //-------------------------------------------------------------------------
  // constructors
  //-------------------------------------------------------------------------
  constructor(private prisma: PrismaService) {
    super();
  }

  //-------------------------------------------------------------------------
  // methods
  //-------------------------------------------------------------------------
  async findAll({
    keyword,
    pageIndex = 0,
    pageSize = 20,
  }: TagServiceFindAllInput): Promise<TagServiceFindAllOutput> {
    const tags = await this.prisma.tag.findMany({
      /**
       * @TODO 검색 기능 추가
       */
      orderBy: { label: 'asc' },
      skip: pageIndex * pageSize,
      take: pageSize,
    });

    return {
      pageIndex,
      pageSize,
      tags,
    };
  }

  async findOne({ id }: TagServiceFindOneInput): Promise<TagServiceFindOneOutput> {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException('이미 삭제되었거나 존재하지 않는 태그 입니다.');
    }

    return {
      tag,
    };
  }

  async create({ label }: TagServiceCreateInput): Promise<TagServiceCreateOutput> {
    const tag = await this.prisma.tag.create({
      data: { label },
    });

    return { tag };
  }

  async update({ id, label }: TagServiceUpdateInput): Promise<TagServiceUpdateOutput> {
    const { tag } = await this.findOne({ id });

    if (!tag) {
      throw new EntityNotFound(
        '태그를 찾을 수 없습니다. 이미 삭제되었거나 존재하지 않는 태그입니다.'
      );
    }

    const updatedTag = await this.prisma.tag.update({
      where: { id },
      data: { label },
    });

    return { tag: updatedTag };
  }

  async remove({ id }: TagServiceRemoveInput): Promise<TagServiceRemoveOutput> {
    const { tag } = await this.findOne({ id });

    if (!tag) {
      throw new EntityNotFound(
        '태그를 찾을 수 없습니다. 이미 삭제되었거나 존재하지 않는 태그입니다.'
      );
    }

    await this.prisma.tag.delete({
      where: { id },
    });

    return { success: true };
  }
}
