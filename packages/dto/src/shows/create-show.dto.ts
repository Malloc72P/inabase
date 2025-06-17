import { z } from 'zod';
import { ShowDtoSchema } from './show.dto';

export const CreateShowInputSchema = z
  .object({
    title: z
      .string()
      .min(1, '제목은 필수입니다.')
      .max(50, '제목은 최대 50자까지 입력할 수 있습니다.'),
    tags: z
      .array(z.string())
      .max(30, '태그는 최대 30개까지 등록할 수 있습니다.')
      .optional()
      .default([]),
    description: z
      .string()
      .min(1, '설명은 필수입니다.')
      .max(5000, '설명은 최대 5000자까지 입력할 수 있습니다.'),
  })
  .strict();
export type CreateShowInput = z.infer<typeof CreateShowInputSchema>;

export const CreateShowOutputSchema = z.object({
  show: ShowDtoSchema,
});
export type CreateShowOutput = z.infer<typeof CreateShowOutputSchema>;
