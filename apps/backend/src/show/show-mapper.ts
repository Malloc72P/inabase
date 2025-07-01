import { Show } from '@prisma/client';
import { ShowDetailDto, ShowDto } from '@repo/dto';

export function toShowDto(show: Show): ShowDto {
  return {
    id: show.id,
    title: show.title,
    tags: show.tags,
    createdAt: show.createdAt.toISOString(),
    updatedAt: show.updatedAt.toISOString(),
  };
}

export function toShowDetailDto(show: Show): ShowDetailDto {
  return {
    id: show.id,
    title: show.title,
    description: show.description,
    tags: show.tags,
    createdAt: show.createdAt.toISOString(),
    updatedAt: show.updatedAt.toISOString(),
  };
}
