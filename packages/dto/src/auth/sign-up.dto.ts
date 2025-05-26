import z from 'zod';

export const SignUpParamSchema = z
  .object({
    email: z.string().nonempty(),
    name: z.string().nonempty(),
    password: z.string().nonempty(),
  })
  .strict();

export type SignUpParam = z.infer<typeof SignUpParamSchema>;

export const SignUpResultSchema = z.object({
  result: z.boolean(),
});

export type SignUpResult = z.infer<typeof SignUpResultSchema>;
