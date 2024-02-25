import LottoPaymentValidator from '../src/validators/LottoPaymentValidator';
import LottoValidator from '../src/validators/LottoValidator';
import { ERROR_MESSAGES } from '../src/constants/messages';

describe('구입 금액 테스트', () => {
  test('구입 금액은 1000원 단위로 나누어 떨어지지 않으면 에러를 발생한다.', () => {
    expect(() => {
      LottoPaymentValidator.validate(1001);
    }).toThrow(ERROR_MESSAGES.invalidDividedUnit);
  });

  test('구입 금액은 1000원 단위로 나누어 떨어져야 한다.', () => {
    expect(() => {
      LottoPaymentValidator.validateDividedUnit(1000);
    }).not.toThrow(ERROR_MESSAGES.invalidDividedUnit);
  });
});

describe('당첨 번호 입력 테스트', () => {
  test('입력된 당첨 번호가 6개가 아닐 경우 에러를 발생한다.', () => {
    expect(() => {
      LottoValidator.validateLength([1, 2, 3, 4, 5]);
    }).toThrow(ERROR_MESSAGES.invalidLength);
  });

  test('입력된 당첨 번호가 중복될 경우 에러를 발생한다.', () => {
    expect(() => {
      LottoValidator.validateUniqueNumber([1, 2, 3, 4, 5, 5]);
    }).toThrow(ERROR_MESSAGES.invalidUniqueNumber);
  });

  test('입력된 당첨 번호가 1~45 사이의 숫자가 아닐 경우 에러를 발생한다.', () => {
    expect(() => {
      LottoValidator.validateWinningNumbersRange([0, 2, 3, 4, 5, 5]);
    }).toThrow(ERROR_MESSAGES.invalidRange);
  });
});

describe('보너스 번호 입력 테스트', () => {
  test('입력된 보너스 번호가 1~45 사이의 숫자가 아닐 경우 에러를 발생한다.', () => {
    expect(() => {
      LottoValidator.validateRange('a');
    }).toThrow(ERROR_MESSAGES.invalidRange);
  });

  test('입력된 보너스 번호가 당첨 번호와 중복될 경우 에러를 발생한다.', () => {
    expect(() => {
      LottoValidator.validateUniqueNumber([1, 2, 3, 4, 5, 6, 6]);
    }).toThrow(ERROR_MESSAGES.invalidUniqueNumber);
  });
});
