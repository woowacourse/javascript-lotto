import LottoPaymentValidator from '../src/validators/LottoPaymentValidator';
import { ERROR_MESSAGES } from '../src/constants/messages';

describe('구입 금액 테스트', () => {
  test('구입 금액은 1000원 단위로 나누어 떨어져야 한다.', () => {
    expect(() => {
      LottoPaymentValidator.validate(1001);
    }).toThrow(ERROR_MESSAGES.invalidDividedUnit);
  });
});
