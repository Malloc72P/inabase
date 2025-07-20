import z from 'zod';

export const TagLabelSchema = z
  .string()
  .min(1, '태그 이름은 필수입니다.')
  .max(200, '태그 이름은 최대 200자까지 입력할 수 있습니다.');
