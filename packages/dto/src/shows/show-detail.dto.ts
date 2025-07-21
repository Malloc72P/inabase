import { z } from 'zod';
import { TagDtoSchema } from '../tags';

export const ShowDetailDtoSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  tags: z.array(TagDtoSchema).optional().default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ShowDetailDto = z.infer<typeof ShowDetailDtoSchema>;
