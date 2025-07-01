import z from 'zod';

export const ShowTitleSchema = z
  .string()
  .min(1, '제목은 필수입니다.')
  .max(200, '제목은 최대 200자까지 입력할 수 있습니다.');

export const ShowDescriptionSchema = z
  .string()
  .min(1, '설명은 필수입니다.')
  .max(5000, '설명은 최대 5000자까지 입력할 수 있습니다.');

export const ShowTagsSchema = z
  .array(z.string())
  .max(30, '태그는 최대 30개까지 등록할 수 있습니다.')
  .optional()
  .default([]);
