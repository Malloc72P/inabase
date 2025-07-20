import { z } from 'zod';
import { TagDtoSchema } from './tag.dto';
import { TagLabelSchema } from './tag-mutation.dto';

export const CreateTagInputSchema = z
  .object({
    label: TagLabelSchema,
  })
  .strict();
export type CreateTagInput = z.infer<typeof CreateTagInputSchema>;

export const CreateTagOutputSchema = z.object({
  tag: TagDtoSchema,
});
export type CreateTagOutput = z.infer<typeof CreateTagOutputSchema>;
