import { z } from 'zod';

export const TagDetailDtoSchema = z.object({
  id: z.string().nonempty(),
  label: z.string().nonempty(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type TagDetailDto = z.infer<typeof TagDetailDtoSchema>;
