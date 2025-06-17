import { FindShowInput } from '@repo/dto';
import { Env } from 'src/libs/env';

/**
 * 객체 형태의 파라미터를 URL 쿼리 문자열로 변환합니다.
 * 예를 들어, { a: 1, b: 2 }는 "?a=1&b=2"로 변환됩니다.
 * URL의 끝에 붙여서 사용하면 됩니다. 그래서 이름이 꼬리인 tail입니다.
 *
 * @param param - 변환할 객체 형태의 파라미터
 * @returns 쿼리 문자열 형태의 URL 파라미터
 */
function tail(param: Record<string, any>): string {
  const paramList: string[] = [];

  for (const key in param) {
    const k = encodeURIComponent(key);
    const v = encodeURIComponent(param[key]);

    paramList.push(`${k}=${v}`);
  }

  return paramList.length > 0 ? '?' + paramList.join('&') : '';
}

export const ApiLinkMap = {
  health: {
    check: () => Env.beApiUrl + '/health',
  },
  shows: {
    list: (param: FindShowInput) => Env.beApiUrl + '/shows' + tail(param),
    create: () => Env.beApiUrl + '/shows',
    detail: (showId: string) => Env.beApiUrl + `/shows/${showId}`,
    update: (showId: string) => Env.beApiUrl + `/shows/${showId}`,
    delete: (showId: string) => Env.beApiUrl + `/shows/${showId}`,
  },
  auth: {
    signin: () => Env.beApiUrl + '/auth/signin',
    signup: () => Env.beApiUrl + '/auth/signup',
    signout: () => Env.beApiUrl + '/auth/signout',
    profile: {
      get: () => Env.beApiUrl + '/auth/profile',
      update: (id: string) => Env.beApiUrl + `/user/${id}`,
    },
    refresh: () => Env.beApiUrl + '/auth/refresh',
  },
};
