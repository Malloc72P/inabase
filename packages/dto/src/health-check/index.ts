import { z } from 'zod';

export const HealthCheckOutputSchema = z.object({
  statusCode: z.number(),
  dateTime: z.string(),
});
export type HealthCheckOutput = z.infer<typeof HealthCheckOutputSchema>;
