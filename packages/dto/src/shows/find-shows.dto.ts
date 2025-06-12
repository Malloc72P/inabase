import { z } from 'zod';
import { ShowDtoSchema } from './show.dto';

export type FindShowsInput = {};

export const FindShowsOutputSchema = z.object({
  shows: z.array(ShowDtoSchema),
});
export type FindShowsOutput = z.infer<typeof FindShowsOutputSchema>;
