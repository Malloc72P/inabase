import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseComponent } from '@src/base/base.component';
import { EntityNotFound } from '@src/exceptions/common.exception';
import { PrismaService } from '@src/prisma/prisma.service';
import {
  ShowServiceCreateInput,
  ShowServiceCreateOutput,
  ShowServiceFindOneInput,
  ShowServiceFindOneOutput,
  ShowServiceRemoveInput,
  ShowServiceRemoveOutput,
  ShowServiceUpdateInput,
  ShowServiceUpdateOutput,
} from './show.service.dto';

@Injectable()
export class ShowService extends BaseComponent {
  //-------------------------------------------------------------------------
  // constructors
  //-------------------------------------------------------------------------
  constructor(private prisma: PrismaService) {
    super();
  }

  //-------------------------------------------------------------------------
  // methods
  //-------------------------------------------------------------------------

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
