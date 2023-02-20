import Validator from '../../src/Validators/Validator.js';

describe('Validator테스트', () => {
  test.each([['1000'], ['123'], ['0']])(
    '입력 문자열에 숫자만 있을 경우 true를 반환한다.',
    input => {
      expect(() => Validator.isNumericString(input)).not.toThrowError(
        '[ERROR]'
      );
    }
  );

  test.each([['abc'], ['abc123'], ['123abc']])(
    '입력 문자열에 숫자가 아닌 문자가 있을 경우 false를 반환한다.',
    input => {
      expect(() => Validator.isNumericString(input)).toThrowError();
    }
  );

  test.each([
    [8000, 1000],
    [5000, 500],
    [10, 10],
  ])('target이 나누어 떨어지는 경우 true를 리턴한다.', (target, divider) => {
    expect(() => Validator.canDivide(target, divider)).not.toThrowError(
      '[ERROR]'
    );
  });

  test.each([
    [8000, 300],
    [5000, 300],
    [10, 3],
  ])(
    'target이 나누어 떨어지지 않는 경우 false를 리턴한다.',
    (target, divider) => {
      expect(() => Validator.canDivide(target, divider)).toThrowError();
    }
  );
});
