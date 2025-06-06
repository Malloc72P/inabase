import { z } from 'zod';

export const ShowDtoSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty(),
  tags: z.array(z.string()).nonempty(),
});
export type ShowDto = z.infer<typeof ShowDtoSchema>;
