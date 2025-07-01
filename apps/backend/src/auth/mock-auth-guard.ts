import { CanActivate, ExecutionContext } from '@nestjs/common';
import { IRequester } from '@src/util/user-decorator';

/**
 * 테스트용 Mock 사용자 객체
 * @description 이 객체는 컨트롤러 테스트 시 인증된 사용자로 가정합니다.
 * 실제 사용자 정보가 아닌 테스트용으로 사용됩니다.
 */
export const Tester: IRequester = {
  id: 'tester',
  email: '',
  role: 'user',
};

/**
 * 컨트롤러 테스트용 Mock Guard
 * @description 이 Guard는 컨트롤러 테스트 시 인증된 사용자로 가정하고
 * 요청 객체에 `user` 속성을 추가합니다.
 * 실제 인증 로직을 대체하지 않습니다.
 */
export class MockJwtGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();

    req.user = Tester;

    return true;
  }
}
