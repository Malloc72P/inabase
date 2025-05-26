import z from 'zod';

export const FindShowsInputSchema = z.object({});

export type FindShowsInput = z.infer<typeof FindShowsInputSchema>;

export const FindShowsOutputSchema = z.object({});

export type FindShowsOutput = z.infer<typeof FindShowsOutputSchema>;
