/*eslint-disable */
const Validator = require('../src/domain/validation/validator');

describe('Validator 테스트', () => {
  test.each([
    { input: '우테코', expected: false },
    { input: '1000', expected: true },
  ])('입력된 구입 금액이 숫자인지 판별하기.', ({ input, expected }) => {
    expect(Validator.isNumber(input)).toBe(expected);
  });

  test.each([
    { input: ' ', expected: true },
    { input: '1000', expected: false },
  ])(
    '입력된 구입 금액이 공백을 포함하는지 판별하기.',
    ({ input, expected }) => {
      expect(Validator.isBlankIncluded(input)).toBe(expected);
    }
  );

  test.each([
    { input: '', expected: true },
    { input: '1000', expected: false },
  ])('입력된 구입 금액이 빈 문자열인지 판별하기.', ({ input, expected }) => {
    expect(Validator.isEmpty(input)).toBe(expected);
  });

  test.each([
    { input: '-1000', expected: true },
    { input: '0', expected: true },
    { input: '1000', expected: false },
  ])('입력된 구입 금액이 0또는 음수인지 판별하기.', ({ input, expected }) => {
    expect(Validator.isSmallerOrEqualThanZero(input)).toBe(expected);
  });

  test.each([
    { input: '700', expected: false },
    { input: '1200', expected: false },
    { input: '3000', expected: true },
  ])('입력된 구입 금액이 1000원 단위인지 판별하기.', ({ input, expected }) => {
    expect(Validator.isValidUnit(input)).toBe(expected);
  });
});
