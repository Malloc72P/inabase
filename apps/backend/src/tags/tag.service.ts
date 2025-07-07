import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseComponent } from '@src/base/base.component';
import { EntityNotFound } from '@src/exceptions/common.exception';
import { PrismaService } from '@src/prisma/prisma.service';
import {
  TagServiceCreateInput,
  TagServiceCreateOutput,
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
  async findOne({ id }: TagServiceFindOneInput): Promise<TagServiceFindOneOutput> {
    const tag = await this.prisma.tag.findUnique({
      where: { id, deleted: false },
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

    if (!tag || tag.deleted) {
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

    if (!tag || tag.deleted) {
      throw new EntityNotFound(
        '태그를 찾을 수 없습니다. 이미 삭제되었거나 존재하지 않는 태그입니다.'
      );
    }

    await this.prisma.tag.update({
      where: { id },
      data: { deleted: true },
    });
  }
}
