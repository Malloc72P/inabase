import { z } from 'zod';
import { TagDtoSchema } from './tag.dto';

const FindTagInputSchema = z.object({
  keyword: z.string().optional(),
  pageIndex: z.number(),
  pageSize: z.number(),
});

export type FindTagsInput = z.infer<typeof FindTagInputSchema>;

export const FindTagsOutputSchema = z.object({
  tags: z.array(TagDtoSchema),
  keyword: z.string(),
  pageIndex: z.number(),
  pageSize: z.number(),
  total: z.number(),
});
export type FindTagsOutput = z.infer<typeof FindTagsOutputSchema>;
