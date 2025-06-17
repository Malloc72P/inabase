import { z } from 'zod';
import { ShowDtoSchema } from './show.dto';
import { ShowDetailDtoSchema } from './show-detail.dto';

export const UpdateShowInputSchema = z
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
  })
  .strict();
export type UpdateShowInput = z.infer<typeof UpdateShowInputSchema>;

export const UpdateShowOutputSchema = z.object({
  show: ShowDetailDtoSchema,
});
export type UpdateShowOutput = z.infer<typeof UpdateShowOutputSchema>;
