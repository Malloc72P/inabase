import { Expose } from 'class-transformer';
import { ShowDto } from './show';

export class FindShowsInput {}

export class FindShowsOutput {
  @Expose()
  shows: ShowDto[];
}
