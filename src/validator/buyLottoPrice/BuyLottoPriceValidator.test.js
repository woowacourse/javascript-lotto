import AppError from '../../errors/AppError/AppError.js';
import BuyLottoPriceValidator from './BuyLottoPriceValidator.js';

describe('구입 로또 금액 유효성 검사', () => {
  // given
  const validateLottoPrice = (inputValue) => BuyLottoPriceValidator.check(inputValue);

  const ERROR_CASES = [
    {
      input: 'a',
      expectedErrorMessage: BuyLottoPriceValidator.validationTypes.isTypeOfNumber.errorMessage,
    },
    {
      input: '*',
      expectedErrorMessage: BuyLottoPriceValidator.validationTypes.isTypeOfNumber.errorMessage,
    },
    {
      input: '999',
      expectedErrorMessage: BuyLottoPriceValidator.validationTypes.outOfRange.errorMessage,
    },
    {
      input: '1001',
      expectedErrorMessage: BuyLottoPriceValidator.validationTypes.notInThousandUnit.errorMessage,
    },
    {
      input: '1500',
      expectedErrorMessage: BuyLottoPriceValidator.validationTypes.notInThousandUnit.errorMessage,
    },
    {
      input: '11000',
      expectedErrorMessage: BuyLottoPriceValidator.validationTypes.outOfRange.errorMessage,
    },
  ];
  describe('예외 테스트', () => {
    test.each(ERROR_CASES)(
      '입력값이 "$input" 일 때 "$expectedErrorMessage" 메세지와 함께 에러가 발생해야 한다.',
      ({ input, expectedErrorMessage }) => {
        // when - then
        expect(() => validateLottoPrice(input)).toThrow(new AppError(expectedErrorMessage));
      },
    );
  });

  describe('정상 작동 테스트', () => {
    // given
    const SUCCESS_CASES = [{ input: '1000' }, { input: '5000' }, { input: '10000' }];
    test.each(SUCCESS_CASES)('입력값이 "$input" 일 때 에러가 발생하지 않는다.', ({ input }) => {
      // when - then
      expect(() => validateLottoPrice(input)).not.toThrow();
    });
  });
});
