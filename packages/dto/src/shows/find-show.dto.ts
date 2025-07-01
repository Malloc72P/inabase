import { z } from 'zod';
import { ShowDetailDtoSchema } from './show-detail.dto';

export type FindShowInput = {};

export const FindShowOutputSchema = z.object({
  show: ShowDetailDtoSchema,
});
export type FindShowOutput = z.infer<typeof FindShowOutputSchema>;
