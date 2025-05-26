import z from 'zod';

export const ShowDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  tags: z.string(),
});

export type ShowDto = z.infer<typeof ShowDtoSchema>;
