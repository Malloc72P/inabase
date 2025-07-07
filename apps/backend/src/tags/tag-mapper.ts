import { ShowTagsWithTag } from '@src/show/show.entity';

export function toTagDto(tagTag: ShowTagsWithTag): string {
  return tagTag.tag.label;
}
