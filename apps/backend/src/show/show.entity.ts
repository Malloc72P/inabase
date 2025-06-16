import { BaseEntity } from '@src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Show extends BaseEntity {
  @Column()
  title: string;

  @Column('varchar', { array: true })
  tags: string[];

  @Column('varchar', { nullable: false })
  description: string;

  update({ title, tags }: { title?: string; tags: string[] }) {
    if (title) {
      this.title = title;
    }

    this.tags = tags;
  }
}
