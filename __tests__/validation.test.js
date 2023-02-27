import {
  isPositiveInteger,
  isValidRestartCommand,
  isValidLottoNumber,
  isDuplicateNumbers,
} from '../src/validation';

describe('유효성 검증 테스트입니다.', () => {
  test.each([1.11, -1, 2.3, 3.1])('양의 정수가 아니면 false를 반환한다.', (value) => {
    expect(isPositiveInteger(Number(value))).toBeFalsy();
  });

  test.each(['y', 'n'])('재시작 입력에서 y와 n를 받으면 true를 반환한다.', (input) => {
    expect(isValidRestartCommand(input)).toBeTruthy();
  });

  test.each(['df', 's', 'w', 'a', 'gg'])(
    '재시작 입력에서 y와 n인 아닌 입력을 받으면 false를 반환한다.',
    (input) => {
      expect(isValidRestartCommand(input)).toBeFalsy();
    },
  );

  test.each([1, 2, 3, 4, 34, 44, 45])('유효한 로또 숫자이면 true를 반환한다.', (number) => {
    expect(isValidLottoNumber(number)).toBeTruthy();
  });

  test.each([-1, 0, 46, 47])('유효한 로또 숫자가 아니면 false를 반환한다.', (number) => {
    expect(isValidLottoNumber(number)).toBeFalsy();
  });

  test.each([
    [[2, 1, 2, 3, 4, 5]],
    [[1, 1, 2, 3, 4, 5, 6]],
    [[5, 6, 7, 8, 44, 44]],
    [[1, 44, 45, 42, 43, 44]],
    [[1, 13, 8, 16, 4, 12, 15, 16]],
    [[10, 11, 12, 13, 14]],
  ])('로또 번호가 중복되었는지와 길이(갯수)가 유효한지 검사한다.', (numbers) => {
    expect(isDuplicateNumbers(numbers)).toBeTruthy();
  });
});
