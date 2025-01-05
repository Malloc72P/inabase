import { ShowDto } from './show';

export interface FindShowsInput {}
export interface FindShowsOutput {
  shows: ShowDto[];
}
