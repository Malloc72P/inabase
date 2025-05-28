import z from 'zod';

export const ProfileSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;
