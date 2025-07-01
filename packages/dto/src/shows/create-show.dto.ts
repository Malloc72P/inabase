import { z } from 'zod';
import { ShowDtoSchema } from './show.dto';
import { ShowDescriptionSchema, ShowTagsSchema, ShowTitleSchema } from './show-mutation.dto';

export const CreateShowInputSchema = z
  .object({
    title: ShowTitleSchema,
    description: ShowDescriptionSchema,
    tags: ShowTagsSchema,
  })
  .strict();
export type CreateShowInput = z.infer<typeof CreateShowInputSchema>;

export const CreateShowOutputSchema = z.object({
  show: ShowDtoSchema,
});
export type CreateShowOutput = z.infer<typeof CreateShowOutputSchema>;
