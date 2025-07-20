import { ShowTagsWithTag } from '@src/show/show.entity';

export function toShowTagDto(showTagWithTag: ShowTagsWithTag): string {
  return showTagWithTag.tag.label;
}
