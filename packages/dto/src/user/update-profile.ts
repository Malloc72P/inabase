import z from 'zod';
import { ProfileSchema } from '../auth';

export const UpdateProfileInputSchema = z.object({
  name: z.string().nonempty(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileInputSchema>;

export const UpdateProfileOutputSchema = z.object({
  profile: ProfileSchema,
});

export type UpdateProfileOutput = z.infer<typeof UpdateProfileOutputSchema>;
