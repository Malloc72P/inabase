import { z } from 'zod';
import { TagDetailDtoSchema } from './tag-detail.dto';

export type FindTagInput = {};

export const FindTagOutputSchema = z.object({
  tag: TagDetailDtoSchema,
});
export type FindTagOutput = z.infer<typeof FindTagOutputSchema>;
