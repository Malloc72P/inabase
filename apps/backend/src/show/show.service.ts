import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseComponent } from '@src/base/base.component';
import { Repository } from 'typeorm';
import { Show } from './show.entity';
import {
  ShowServiceCreateInput,
  ShowServiceCreateOutput,
  ShowServiceFindAllOutput,
  ShowServiceFindOneInput,
  ShowServiceFindOneOutput,
  ShowServiceRemoveInput,
  ShowServiceRemoveOutput,
  ShowServiceUpdateInput,
  ShowServiceUpdateOutput,
} from './show.service.dto';
import { EntityNotFound } from '@src/exceptions/common.exception';

@Injectable()
export class ShowService extends BaseComponent {
  constructor(@InjectRepository(Show) private showRepository: Repository<Show>) {
    super();
  }

  async findAll(): Promise<ShowServiceFindAllOutput> {
    const shows = await this.showRepository.find({
      where: { deleted: false },
      order: { createdAt: 'desc' },
    });

    return {
      shows,
    };
  }

  async findOne({ id }: ShowServiceFindOneInput): Promise<ShowServiceFindOneOutput> {
    const show = await this.showRepository.findOneBy({ id, deleted: false });

    if (!show) {
      throw new NotFoundException('이미 삭제되었거나 존재하지 않는 쇼 입니다.');
    }

    return {
      show,
    };
  }

  async create({ title, tags }: ShowServiceCreateInput): Promise<ShowServiceCreateOutput> {
    const show = await this.showRepository.save({ title, tags });

    return { show };
  }

  async update({ id, title, tags }: ShowServiceUpdateInput): Promise<ShowServiceUpdateOutput> {
    const { show } = await this.findOne({ id });

    if (!show || show.deleted) {
      throw new EntityNotFound('쇼를 찾을 수 없습니다. 이미 삭제되었거나 존재하지 않는 쇼입니다.');
    }

    show.update({ title, tags });

    this.showRepository.save(show);

    return { show };
  }

  async remove({ id }: ShowServiceRemoveInput): Promise<ShowServiceRemoveOutput> {
    const { show } = await this.findOne({ id });

    if (!show || show.deleted) {
      throw new EntityNotFound('쇼를 찾을 수 없습니다. 이미 삭제되었거나 존재하지 않는 쇼입니다.');
    }

    show.delete();

    await this.showRepository.save(show);
  }
}
