import { z } from 'zod';
import { ShowDetailDtoSchema } from './show-detail.dto';
import { ShowTitleSchema, ShowDescriptionSchema, ShowTagsSchema } from './show-mutation.dto';

export const UpdateShowInputSchema = z
  .object({
    title: ShowTitleSchema,
    description: ShowDescriptionSchema,
    tags: ShowTagsSchema,
  })
  .strict();
export type UpdateShowInput = z.infer<typeof UpdateShowInputSchema>;

export const UpdateShowOutputSchema = z.object({
  show: ShowDetailDtoSchema,
});
export type UpdateShowOutput = z.infer<typeof UpdateShowOutputSchema>;
