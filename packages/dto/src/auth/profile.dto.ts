import { z } from 'zod';

export const ProfileResultSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

export type ProfileResult = z.infer<typeof ProfileResultSchema>;
