import ERROR_MESSAGE from '../src/constant/errorMessage';
import Validator from '../src/validator/Validator';

describe('[Validator] 로또 구입 금액 검증', () => {
  test.each`
    title                               | input       | errorMessage
    ${'입력값은 공백이 아니여야 한다.'} | ${''}       | ${ERROR_MESSAGE.INPUT_IS_EMPTY}
    ${'입력값은 숫자여야 한다.'}        | ${'string'} | ${ERROR_MESSAGE.INPUT_IS_NOT_NUMBER}
    ${'입력 값은 1000 단위여야 한다.'}  | ${'500'}    | ${ERROR_MESSAGE.PURCHASE_AMOUNT_NOT_DIVIDED}
  `('$title', ({ input, errorMessage }) => {
    const validation = () => Validator.validatePurchaseAmount(input);
    expect(validation).toThrow(errorMessage);
  });
});
