import { z } from 'zod';

export const TagDtoSchema = z.object({
  id: z.string().nonempty(),
  label: z.string().nonempty(),
  createdAt: z.date().transform((d) => d.toISOString()),
  updatedAt: z.date().transform((d) => d.toISOString()),
});
export type TagDto = z.infer<typeof TagDtoSchema>;
