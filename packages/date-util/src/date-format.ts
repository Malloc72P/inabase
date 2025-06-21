export type IDateFormat = 'long' | 'short' | 'file' | 'iso' | 'postCard';

export const DateFormat: Record<IDateFormat, string> = {
  long: 'YYYY. MM. DD. dddd a h시 m분',
  short: 'YY년 MM월 DD일',
  file: 'YYMMDD_HHmmss',
  iso: 'YYYY-MM-DDTHH:mm',
  postCard: 'YYYY/MM/DD a hh:mm',
};
