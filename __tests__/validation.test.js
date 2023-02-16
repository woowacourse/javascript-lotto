import { isPositiveInteger } from '../src/validation';

describe('유효성 검증 테스트입니다.', () => {
  test.each([1.11, null, undefined, 'string', {}])(
    '양의 정수가 아니면 false를 반환한다.',
    (value) => {
      expect(isPositiveInteger(Number(value))).toBe(false);
    },
  );
});
