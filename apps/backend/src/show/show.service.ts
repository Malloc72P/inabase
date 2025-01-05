import { Injectable } from '@nestjs/common';
import { BaseComponent } from '@src/base/base.component';
import { Repository } from 'typeorm';
import { Show } from './show.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShowService extends BaseComponent {
  constructor(@InjectRepository(Show) private showRepository: Repository<Show>) {
    super();
  }

  findAll(): Promise<Show[]> {
    return this.showRepository.find();
  }

  findOne(id: number): Promise<Show | null> {
    return this.showRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.showRepository.update({ id }, { deleted: true });
  }
}
