import { Tag } from '@prisma/client';
import { TagDetailDto, TagDto } from '@repo/dto';

export function toTagDto(tag: Tag): TagDto {
  return {
    id: tag.id,
    label: tag.label,
    createdAt: tag.createdAt.toISOString(),
    updatedAt: tag.updatedAt.toISOString(),
  };
}

export function toTagDetailDto(tag: Tag): TagDetailDto {
  return toTagDto(tag);
}
