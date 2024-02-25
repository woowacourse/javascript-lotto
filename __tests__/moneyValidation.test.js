import { ERROR_MESSAGE } from '../src/constants/message';
import MoneyValidation from '../src/validation/MoneyValidation';

describe('구입 금액 유효성 테스트', () => {
  test.each([['0'], ['999'], ['-1000'], ['1000.5']])(
    '유효하지 않은 구입 금액인 %s를 넣으면 에러를 반환한다.',
    (money) => {
      expect(() => MoneyValidation.validate(money)).toThrow(ERROR_MESSAGE.PREFIX);
    }
  );
});
