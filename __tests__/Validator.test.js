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

describe('[Validator] 당첨 번호 검증', () => {
  test.each`
    title                                              | input                 | errorMessage
    ${'입력값은 공백이 아니여야 한다.'}                | ${''}                 | ${ERROR_MESSAGE.INPUT_IS_EMPTY}
    ${'입력값은 쉼표로 구분되는 6개의 값이어야 한다.'} | ${'1,2,3,4,5'}        | ${ERROR_MESSAGE.LOTTO_NUMBER_LENGTH}
    ${'당첨 번호 숫자는 1~45 사이여야 한다.'}          | ${'0,10,20,30,40,50'} | ${ERROR_MESSAGE.LOTTO_NUMBER_RANGE}
    ${'당첨 번호는 숫자로 입력되어야 한다.'}           | ${'1,2,3,a,4,5'}      | ${ERROR_MESSAGE.LOTTO_NUMBER_FORMAT}
    ${'당첨 번호 숫자는 서로 중복되지 않아야 한다.'}   | ${'1,2,3,4,5,5'}      | ${ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATED}
  `('$title', ({ input, errorMessage }) => {
    const validation = () => Validator.validateWinningNumbers(input);
    expect(validation).toThrow(errorMessage);
  });
});
