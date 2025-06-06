import { z } from 'zod';
import { ProfileResultSchema } from '../auth';

export const UpdateProfileInputSchema = z
  .object({
    name: z.string().min(1),
  })
  .strict();
export type UpdateProfileInput = z.infer<typeof UpdateProfileInputSchema>;

export const UpdateProfileOutputSchema = z
  .object({
    profile: ProfileResultSchema,
  });
export type UpdateProfileOutput = z.infer<typeof UpdateProfileOutputSchema>;
