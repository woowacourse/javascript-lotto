import validator from '../../src/util/validator.js';

describe('validator테스트', () => {
  test.each([['123'], ['abc'], ['']])(
    '입력 문자열이 0으로 시작하지 않는 경우 true를 반환한다.',
    input => {
      expect(validator.isFirstLetterNotZero(input)).toBeTruthy();
    }
  );
  test.each([['0'], ['010'], ['01000']])(
    '입력 문자열이 0으로 시작하는 경우 false를 반환한다.',
    input => {
      expect(() => validator.isFirstLetterNotZero(input)).toThrowError(
        '[ERROR]'
      );
    }
  );

  test.each([['1000'], ['123'], ['0']])(
    '입력 문자열에 숫자만 있을 경우 true를 반환한다.',
    input => {
      expect(validator.isNumericString(input)).toBeTruthy();
    }
  );

  test.each([['abc'], ['abc123'], ['123abc']])(
    '입력 문자열에 숫자가 아닌 문자가 있을 경우 false를 반환한다.',
    input => {
      expect(() => validator.isNumericString(input)).toThrowError();
    }
  );

  test.each([
    [8000, 1000],
    [5000, 500],
    [10, 10],
  ])('target이 나누어 떨어지는 경우 true를 리턴한다.', (target, divider) => {
    expect(validator.canDivide(target, divider)).toBeTruthy();
  });

  test.each([
    [8000, 300],
    [5000, 300],
    [10, 3],
  ])(
    'target이 나누어 떨어지지 않는 경우 false를 리턴한다.',
    (target, divider) => {
      expect(() => validator.canDivide(target, divider)).toThrowError();
    }
  );
});
