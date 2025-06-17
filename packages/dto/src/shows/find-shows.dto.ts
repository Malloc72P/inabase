import { z } from 'zod';
import { ShowDtoSchema } from './show.dto';

const FindShowInputSchema = z.object({
  keyword: z.string().optional(),
});

export type FindShowsInput = z.infer<typeof FindShowInputSchema>;

export const FindShowsOutputSchema = z.object({
  shows: z.array(ShowDtoSchema),
});
export type FindShowsOutput = z.infer<typeof FindShowsOutputSchema>;
