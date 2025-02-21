import { ERROR } from '../src/constants/errors.js';
import { hasEmptyString, isValueInteger } from '../src/validation/validateInput.js';
import { validateBonusNumber, validateWinningNumbers } from '../src/validation/validateLottoNumbers.js';
import { validatePurchasePrice } from '../src/validation/validatePurchasePrice.js';

describe('구입 금액 유효성 검사 테스트', () => {
  describe('구입 금액 예외 케이스', () => {
    test('구입 금액이 빈 값인 경우, `입력 값은 빈 값이 아니여야 해요.` 에러를 반환한다.', () => {
      expect(() => hasEmptyString('')).toThrow(ERROR.EMPTY_VALUE);
    });

    test.each(['a', 2.1])(
      '구입 금액은 문자와 실수인 경우, `입력 값은 양의 정수여야 해요` 에러를 반환한다.',
      (value) => {
        expect(() => isValueInteger(value)).toThrow(ERROR.NOT_POSITIVE_INTEGER);
      },
    );

    test.each([1, 4, 3])('구입 금액은 양의 정수인 경우 테스트를 통과한다.', (value) => {
      expect(() => isValueInteger(value)).not.toThrow();
    });

    test.each(['a', '', -111, 999, 9.9, 0, undefined, NaN, []])(
      '구입 금액이 문자, falsy 값, 실수, 로또 범위에 벗어난 숫자일 경우 에러를 반환한다.',
      (value) => {
        expect(() => validatePurchasePrice(value)).toThrow();
      },
    );
  });

  test('구입 금액은 1000원 이상이면 테스트를 통과한다.', () => {
    expect(() => validatePurchasePrice(1000)).not.toThrow();
  });
});

describe('당첨 번호 유효성 검사 테스트', () => {
  test('당첨 번호 중복되지 않는 6개의 숫자이면 테스트를 통과한다.', () => {
    const testWinningNumbers = '1, 2, 3, 4, 5, 6';
    expect(() => validateWinningNumbers(testWinningNumbers)).not.toThrow();
  });

  describe('당첨 번호 예외 케이스', () => {
    test('당첨 번호는 빈 값일 경우 `입력 값은 빈 값이 아니여야 해요.` 에러를 반환한다.', () => {
      expect(() => hasEmptyString('')).toThrow(ERROR.EMPTY_VALUE);
    });

    test.each(['a', 2.1])(
      '당첨 번호가 문자 혹은 실수일 경우 `입력 값은 양의 정수여야 해요` 에러를 반환한다',
      (value) => {
        expect(() => isValueInteger(value)).toThrow(ERROR.NOT_POSITIVE_INTEGER);
      },
    );

    test.each([1, 4, 3])('당첨 번호가 양의 정수일 경우 테스트를 통과한다.', (value) => {
      expect(() => isValueInteger(value)).not.toThrow();
    });

    test('당첨 번호가 중복될 경우 `당첨 번호는 중복될 수 없어요.`에러를 반환한다.', () => {
      const testWinningNumbers = '1,2,3,4,5,5';
      expect(() => validateWinningNumbers(testWinningNumbers)).toThrow(ERROR.DUPLICATED_WINNING_NUMBER);
    });

    test('당첨 번호는 6개가 아니면 `당첨 번호는 6개여야 해요.` 에러를 반환한다.', () => {
      const testWinningNumbers = '1,2,3,4,5';
      expect(() => validateWinningNumbers(testWinningNumbers)).toThrow(ERROR.NOT_SAME_LENGTH_OF_WINNING_NUMBER);
    });

    test('당첨 번호는 1이상 45이하의 범위에 벗어난 정수를 입력하면 `당첨 번호는 1~45 사이여야 해요.` 에러를 반환한다.', () => {
      const testWinningNumbers = '1,2,3,4,5,99';
      expect(() => validateWinningNumbers(testWinningNumbers)).toThrow(ERROR.NOT_RANGE_OF_WINNING_NUMBER);
    });
  });
});

describe('보너스 번호 유효성 검사 테스트', () => {
  test('보너스 번호와 당첨 번호이 중복될 경우 `보너스 번호는 당첨 번호와 중복될 수 없어요.` 에러를 반환한다. ', () => {
    const testWinningNumbers = [1, 2, 3, 4, 5, 6];
    const testBonusNumber = 5;
    expect(() => validateBonusNumber(testBonusNumber, testWinningNumbers)).toThrow(ERROR.DUPLICATED_BONUS_NUMBER);
  });

  test('로또 당첨 번호와 중복되지 않고 로또 숫자 범위 안에 해당되는 보너스 번호 통과 케이스.', () => {
    const testWinningNumbers = [1, 2, 3, 4, 5, 6];
    const testBonusNumber = 7;
    expect(() => validateBonusNumber(testBonusNumber, testWinningNumbers)).not.toThrow();
  });
});
