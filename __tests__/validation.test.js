import { isPositiveInteger, isValidLottoNumber, isValidRestartCommand } from '../src/Validation';

describe('유효성 검증 테스트입니다.', () => {
  test.each([1.11, null, undefined, 'string', {}])(
    '양의 정수가 아니면 false를 반환한다.',
    (value) => {
      expect(isPositiveInteger(Number(value))).toBe(false);
    },
  );

  test.each([0, 46])('개별 당첨 번호는 1부터 45까지이다.', (number) => {
    expect(isValidLottoNumber(number)).toBe(false);
  });

  test.each(['y', 'n'])('재시작 입력에서 y와 n를 받으면 true를 반환한다.', (input) => {
    expect(isValidRestartCommand(input)).toBe(true);
  });

  test.each([1, '1'])('재시작 입력에서 y와 n인 아닌 입력을 받으면 false를 반환한다.', (input) => {
    expect(isValidRestartCommand(input)).toBe(false);
  });
});
