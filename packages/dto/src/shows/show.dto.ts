import { z } from 'zod';

export const ShowDtoSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty(),
  tags: z.array(z.string()).optional().default([]),
  createdAt: z.date().transform((d) => d.toISOString()),
  updatedAt: z.date().transform((d) => d.toISOString()),
});
export type ShowDto = z.infer<typeof ShowDtoSchema>;
