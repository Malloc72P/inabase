import { ShowDetailDto, ShowDto } from '@repo/dto';
import { ShowTagsWithTag, ShowWithTags } from './show.entity';

export function toShowDto(show: ShowWithTags): ShowDto {
  return {
    id: show.id,
    title: show.title,
    tags: show.showTags.map(toTagDto),
    createdAt: show.createdAt.toISOString(),
    updatedAt: show.updatedAt.toISOString(),
  };
}

export function toShowDetailDto(show: ShowWithTags): ShowDetailDto {
  return {
    id: show.id,
    title: show.title,
    description: show.description,
    tags: show.showTags.map(toTagDto),
    createdAt: show.createdAt.toISOString(),
    updatedAt: show.updatedAt.toISOString(),
  };
}

export function toTagDto(showTag: ShowTagsWithTag): string {
  return showTag.tag.label;
}
