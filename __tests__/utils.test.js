import generateRandomNumber from '../src/utils/generateRandomNumber';
import validator from '../src/utils/validator';

describe('generateRandomNumber 테스트', () => {
  test('랜덤한 숫자가 1 이상 45 이하이다.', () => {
    const min = 1;
    const max = 45;

    const number = generateRandomNumber(min, max);

    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThanOrEqual(max);
  });
});

describe('validator 테스트', () => {
  test.each([[' '], ['a'], ['-1'], [' 1'], ['1 '], ['1.0'], ['01']])(
    '입력값이 %s일 때 에러를 던진다.',
    (input) => {
      expect(() => {
        validator.checkDigit(input);
      }).toThrow();
    }
  );

  test('숫자가 min 미만일 때 에러를 던진다.', () => {
    const number = 0;
    const min = 1;

    expect(() => {
      validator.checkGreaterThanOrEqualMin(number, min);
    }).toThrow();
  });

  test('숫자가 max 초과일 때 에러를 던진다.', () => {
    const number = 46;
    const max = 45;

    expect(() => {
      validator.checkLessThanOrEqualMax(number, max);
    }).toThrow();
  });

  test('숫자가 unit에 나누어 떨어지지 않을 때 에러를 던진다.', () => {
    const number = 1001;
    const unit = 1000;

    expect(() => {
      validator.checkDivideIntoUnit(number, unit);
    }).toThrow();
  });

  test('배열에 중복이 있을 때 에러를 던진다', () => {
    const array = [1, 1, 2, 3, 4, 5];

    expect(() => {
      validator.checkDuplication(array);
    }).toThrow();
  });

  test('배열의 길이가 length가 아니면 에러를 던진다.', () => {
    const array = [1, 2, 3, 4, 5];
    const length = 6;

    expect(() => {
      validator.checkArrayLength(array, length);
    }).toThrow();
  });
});
