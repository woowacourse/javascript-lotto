import { ERROR } from '../src/validation/errorMessages.js';
import { hasEmptyString, isValueInteger, isYesOrNo } from '../src/validation/validateInput.js';
import {
  checkRangeOfLottoNumber,
  validateBonusNumber,
  validateWinningNumbers,
} from '../src/validation/validateLottoNumbers.js';
import { validatePurchasePrice } from '../src/validation/validatePurchasePrice.js';

describe('구입 금액 유효성 검사 테스트', () => {
  describe('구입 금액 예외 케이스', () => {
    test('구입 금액은 빈 값일 수 없다.', () => {
      expect(() => hasEmptyString('')).toThrow(ERROR.EMPTY_VALUE);
    });

    test.each(['a', 2.1])('구입 금액은 문자와 실수가 아니여야 한다.', (value) => {
      expect(() => isValueInteger(value)).toThrow(ERROR.NOT_POSITIVE_INTEGER);
    });

    test.each([1, 4, 3])('구입 금액은 양의 정수여야 한다.', (value) => {
      expect(() => isValueInteger(value)).not.toThrow();
    });

    test.each(['a', '', -111, 999, 9.9, 0, undefined, NaN, []])('구입 금액은 1000원 이상이여야 한다.', (value) => {
      expect(() => validatePurchasePrice(value)).toThrow();
    });
  });

  test('구입 금액은 1000원 이상이여야 한다.', () => {
    expect(() => validatePurchasePrice(1000)).not.toThrow();
  });
});

describe('로또 번호 유효성 검사 테스트', () => {
  test('로또 번호는 빈 값일 수 없다.', () => {
    expect(() => hasEmptyString('')).toThrow(ERROR.IS_VALUE_EMPTY);
  });

  test.each(['a', 2.1])('로또 번호는 문자와 실수가 아니여야 한다.', (value) => {
    expect(() => isValueInteger(value)).toThrow(ERROR.IS_NOT_POSITIVE_INTEGER);
  });

  test.each([1, 4, 3])('로또 번호는 양의 정수여야 한다.', (value) => {
    expect(() => isValueInteger(value)).not.toThrow();
  });

  describe('로또 번호 범위 테스트', () => {
    test.each([1, 45])('%p는 로또 범위 조건을 만족한다.', (value) => {
      expect(() => checkRangeOfLottoNumber(value)).not.toThrow();
    });

    test.each([0, 46])('%p는 로또 범위 조건을 만족하지 않는다.', (value) => {
      expect(() => checkRangeOfLottoNumber(value)).toThrow();
    });
  });
});

describe('당첨 번호 유효성 검사 테스트', () => {
  test('당첨 번호 통과 케이스', () => {
    const testWinningNumbers = '1, 2, 3, 4, 5, 6';
    expect(() => validateWinningNumbers(testWinningNumbers)).not.toThrow();
  });

  describe('당첨 번호 예외 케이스', () => {
    test('당첨 번호는 중복될 수 없다.', () => {
      const testWinningNumbers = '1,2,3,4,5,5';
      expect(() => validateWinningNumbers(testWinningNumbers)).toThrow();
    });

    test('당첨 번호는 6개여야 한다.', () => {
      const testWinningNumbers = '1,2,3,4,5';
      expect(() => validateWinningNumbers(testWinningNumbers)).toThrow();
    });
  });
});

describe('보너스 번호 유효성 검사 테스트', () => {
  test('보너스 번호는 당첨 번호와 중복될 수 없다.', () => {
    const testWinningNumbers = [1, 2, 3, 4, 5, 6];
    const validate = validateBonusNumber(testWinningNumbers);
    const testBonusNumber = '6';
    expect(() => validate(testBonusNumber)).toThrow();
  });

  test('보너스 번호 통과 케이스.', () => {
    const testWinningNumbers = [1, 2, 3, 4, 5, 6];
    const validate = validateBonusNumber(testWinningNumbers);
    const testBonusNumber = '7';
    expect(() => validate(testBonusNumber)).not.toThrow();
  });
});

describe('재시작 입력 테스트', () => {
  test.each([1, 100, 'Y', 'N'])('%p를 입력하면 에러를 반환해야한다.', (value) => {
    expect(() => isYesOrNo(value)).toThrow();
  });

  test.each(['y', 'n'])('%p는 정상적인 재시작 입력이다.', (value) => {
    expect(() => isYesOrNo(value)).not.toThrow();
  });
});
