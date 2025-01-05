import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  tags: string[];

  @Column()
  deleted: boolean;
}
