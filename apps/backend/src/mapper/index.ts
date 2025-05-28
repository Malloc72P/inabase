import * as auth from './auth-mapper';

/**
 * 엔티티나 기타 객체를 DTO로 변환하는 계층.
 *
 * DTO나 엔티티가 언제 어떻게 바뀔지 모른다.
 * 또한 엔티티를 둘 이상의 DTO로 변환할 수 있어야 한다.
 * 따라서, 유연하게 대응할 수 있도록 Mapper를 직접 구현한다.
 */
export const Mapper = {
  auth,
};
