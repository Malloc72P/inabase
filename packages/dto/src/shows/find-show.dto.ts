import { z } from 'zod';
import { ShowDtoSchema } from './show.dto';

export type FindShowInput = {};

export const FindShowOutputSchema = z.object({
  show: ShowDtoSchema,
});
export type FindShowOutput = z.infer<typeof FindShowOutputSchema>;
