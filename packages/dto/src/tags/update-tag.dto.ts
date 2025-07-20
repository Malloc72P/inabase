import { z } from 'zod';
import { TagDetailDtoSchema } from './tag-detail.dto';
import { TagLabelSchema } from './tag-mutation.dto';

export const UpdateTagInputSchema = z
  .object({
    label: TagLabelSchema,
  })
  .strict();
export type UpdateTagInput = z.infer<typeof UpdateTagInputSchema>;

export const UpdateTagOutputSchema = z.object({
  tag: TagDetailDtoSchema,
});
export type UpdateTagOutput = z.infer<typeof UpdateTagOutputSchema>;
