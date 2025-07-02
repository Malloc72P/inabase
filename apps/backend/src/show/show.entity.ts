import { Show, ShowTag, Tag } from '@prisma/client';

export type ShowTagsWithTag = ShowTag & { tag: Tag };

export type ShowWithTags = Show & { showTags: ShowTagsWithTag[] };
