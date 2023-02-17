import { isPositiveInteger, isValidRestartCommand } from '../src/validation';

describe('유효성 검증 테스트입니다.', () => {
  test.each([1.11, null, undefined, 'string', {}])(
    '양의 정수가 아니면 false를 반환한다.',
    (value) => {
      expect(isPositiveInteger(Number(value))).toBeFalsy();
    },
  );

  test.each(['y', 'n'])('재시작 입력에서 y와 n를 받으면 true를 반환한다.', (input) => {
    expect(isValidRestartCommand(input)).toBeTruthy();
  });

  test.each([1, '1'])('재시작 입력에서 y와 n인 아닌 입력을 받으면 false를 반환한다.', (input) => {
    expect(isValidRestartCommand(input)).toBeFalsy();
  });
});
