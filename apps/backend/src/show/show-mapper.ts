import { ShowDetailDto, ShowDto } from '@repo/dto';
import { ShowTagsWithTag, ShowWithTags } from './show.entity';
import { toTagDto } from '@src/tags/tag-mapper';
import { ShowSearchRawResult } from './show.service.dto';

export function toShowDto(show: ShowWithTags): ShowDto {
  return {
    id: show.id,
    title: show.title,
    tags: show.showTags.map(toTagLabel),
    createdAt: show.createdAt.toISOString(),
    updatedAt: show.updatedAt.toISOString(),
  };
}

export function toShowDtoFromRaw(show: ShowSearchRawResult): ShowDto {
  return {
    id: show.id,
    title: show.title,
    tags: show.tags,
    createdAt: show.createdAt.toISOString(),
    updatedAt: show.updatedAt.toISOString(),
  };
}

export function toShowDetailDto(show: ShowWithTags): ShowDetailDto {
  return {
    id: show.id,
    title: show.title,
    description: show.description,
    tags: show.showTags.map((showTag) => toTagDto(showTag.tag)),
    createdAt: show.createdAt.toISOString(),
    updatedAt: show.updatedAt.toISOString(),
  };
}

export function toTagLabel(showTag: ShowTagsWithTag): string {
  return showTag.tag.label;
}
